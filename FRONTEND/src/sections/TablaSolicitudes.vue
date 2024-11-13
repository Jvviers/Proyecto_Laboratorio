<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

const requests = ref([]);
const error = ref(null);
const userId = ref(null);
const userRole = ref(false);
const validSession = ref(false);
const encargados = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const validateSession = async () => {
	try {
		const response = await fetch(BACKEND_URL + '/session', {
			method: 'POST',
			credentials: 'include',
		});
		if (!response.ok) {
			console.error('Status:', response.status);
		} else {
			const data = await response.json();
			validSession.value = true;
			userId.value = data.id;
			userRole.value = data.is_admin;
			fetchRequests();
		}
	} catch (err) {
		console.error('Error al validar sesión:', err);
	}
};

const fetchRequests = async () => {
    try {
        const route = userRole.value ? '/solicitudes' : `/solicitudes/${userId.value}`;
        const response = await fetch(BACKEND_URL + route, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
        const data = await response.json();
        requests.value = data;
        await loadEquipos();
    } catch (err) {
        error.value = err.message;
        console.error('Error fetching solicitudes:', err);
    }
};

const loadEquipos = async () => {
	try {
		const promises = requests.value.map(async (request) => {
			const equipos = await getEquipos(request.id);
			return { ...request, equipos };
		});
		requests.value = await Promise.all(promises);
	} catch (err) {
		console.error('Error cargando equipos:', err);
	}
};

const getEquipos = async (id) => {
	try {
		const response = await fetch(BACKEND_URL + `/equipo/${id}`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			console.error('Status:', response.status);
			throw new Error('Error en la respuesta del servidor: ' + response.statusText);
		}
		const data = await response.json();
		const nombresEquipos = data
			.filter(item => item.ref_sol === id)
			.map(item => item.nombre_equipo)
			.join(', ');
		return nombresEquipos;
	} catch (err) {
		console.error('Error fetching solicitudes:', err);
		return '';
	}
};
const getEncargados = async () => {
	try {
		const response = await fetch(BACKEND_URL + '/encargados', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			console.error('Status:', response.status);
			throw new Error('Error en la respuesta del servidor: ' + response.statusText);
		}
		const data = await response.json();
		encargados.value = data;
	} catch (err) {
		console.error('Error fetching solicitudes:', err);
	}
};

const goToLogin = () => {
	window.location.href = '/login';
};

const updateEncargado = async (sol_id, ref_enc, solicitante, email) => {
	try {
		const response = await fetch(BACKEND_URL + '/encargado-solicitud', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				ref_enc: ref_enc,
				id: sol_id,
				solicitante: solicitante,
				email: email,
			}),
		});
		if (!response.ok) {
			console.error('Status:', response.status);
			throw new Error('Error en la respuesta del servidor: ' + response.statusText);
		}
		await response.json();
	} catch (err) {
		console.error('Error fetching solicitudes:', err);
	}
};

const updateState = async (sol_id, state, email) => {
	try {
		const response = await fetch(BACKEND_URL + '/estado-solicitud', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				estado: state,
				id: sol_id,
			}),
		});
		if (!response.ok) {
			console.error('Status:', response.status);
			throw new Error('Error en la respuesta del servidor: ' + response.statusText);
		}

		await response.json();
	} catch (err) {
		console.error('Error fetching solicitudes:', err);
	}
};

const eliminarSolicitud = async (id) => {
	try {
		const response = await fetch(BACKEND_URL + '/solicitud', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
			}),
			credentials: 'include',
		});
		if (!response.ok) {
			console.error('Status:', response.status);
			throw new Error('Error en la respuesta del servidor: ' + response.statusText);
		}
		await response.json();
		fetchRequests();
	} catch (err) {
		console.error('Error al eliminar solicitud:', err);
	}
};

const formatDate = (date) => {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	const hours = String(d.getHours()).padStart(2, '0');
	const minutes = String(d.getMinutes()).padStart(2, '0');
	const seconds = String(d.getSeconds()).padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const paginatedRequests = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value;
	const end = start + itemsPerPage.value;
	return requests.value.slice(start, end);
});

let eventSource;

onMounted(() => {
	validateSession();
	getEncargados();

	eventSource = new EventSource(BACKEND_URL + '/observer');
	eventSource.onmessage = (event) => {
		const data = JSON.parse(event.data);
		if (data.type === 'UPDATE' && data.message === 'Update solicitudes') {
			fetchRequests();
		}
		if (data.type === 'UPDATE' && data.message === 'Update encargados') {
			getEncargados();
		}
	};
});

onUnmounted(() => {
	eventSource.close();
});
</script>

<template>
	<header v-if="!validSession" class="flex flex-col justify-center items-center gap-2 py-12">
		<h2 class="text-2xl text-center font-bold text-utal">BIENVENIDO</h2>
		<h3 class="text-lg text-center">Inicia sesión para ver las solicitudes.</h3>
		<div class="flex justify-center items-center py-6">
			<button class="button-red" @click="goToLogin">INICIAR SESIÓN</button>
		</div>
	</header>
	<section v-if="validSession" class="flex flex-col justify-center items-center w-full px-8 md:px-32 gap-6 py-12">
		<div class="flex flex-col justify-center items-center gap-2">
			<h2 class="text-2xl text-center font-bold text-utal">TABLA DE SOLICITUDES</h2>
			<h3 class="text-lg text-center">
				Aquí puedes ver las solicitudes que han sido enviadas, al cambiar el encargado de una 
				solicitud, este será informado vía correo, al cambiar el estado de una solicitud, el 
				solicitante será informado vía correo.
			</h3>
		</div>
		<!-- Contenedor de la tabla -->
		<div class="w-full overflow-x-scroll border">
			<table class="table-auto bg-white">
				<thead class="bg-gray-100 sticky top-0">
					<tr>
						<th>ID</th>
						<th>Encargado</th>
						<th>Solicitante</th>
						<th>Email</th>
						<th>Matricula</th>
						<th>Actividad</th>
						<th>Fecha</th>
						<th>Equipos</th>
						<th>Tipo Proyecto</th>
						<th>Tipo Material</th>
						<th>Tipo Solicitud</th>
						<th>Estado</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					<!-- Iterar sobre los datos de requests -->
					<tr v-for="request in paginatedRequests" :key="request.id">
						<td class="td">{{ request.id }}</td>
						<td>
							<select v-if="request.tipo_form != 'asesoria'" v-model="request.ref_enc"
								@change="updateEncargado(request.id, request.ref_enc, request.solicitante, request.email)" class="border rounded px-2 py-1">
								<option v-for="encargado in encargados" :key="encargado.id" :value="encargado.id">{{
									encargado.email }}
								</option>
							</select>
						</td>
						<td class="td">{{ request.solicitante }}</td>
						<td class="td">{{ request.email }}</td>
						<td class="td">{{ request.matricula }}</td>
						<td class="td overflow-x-scroll max-w-[180px]">{{ request.actividad }}</td>
						<td class="td">
							<p v-if="request.fecha">{{ formatDate(request.fecha) }}</p>
						</td>
						<td class="td overflow-x-scroll max-w-[180px]">
							{{ request.equipos }}</td>
						<td class="td">{{ request.tipo_proyecto }}</td>
						<td class="td">{{ request.tipo_material }}</td>
						<td class="td capitalize">{{ request.tipo_form }}</td>

						<!-- Selector que muestra y actualiza el estado -->
						<td>
							<select v-if="request.tipo_form == 'asesoria'" v-model="request.estado"
								@change="updateState(request.id, request.estado, request.email)"
								class="border rounded px-2 py-1 w-[170px]">
								<option value="en espera">En espera</option>
								<option value="agendado">Agendado</option>
								<option value="terminado">Terminado</option>
							</select>
							<select v-if="request.tipo_form == 'impresion'" v-model="request.estado"
								@change="updateState(request.id, request.estado, request.email)"
								class="border rounded px-2 py-1 w-[170px]">
								<option value="en espera">En espera</option>
								<option value="En cola de Impresión">Cola de Impresión</option>
								<option value="Listo para Retirar">Listo para Retirar</option>
								<option value="Rechazado">Rechazado</option>
								<option value="Terminado">Terminado</option>
							</select>
							<select v-if="request.tipo_form == 'laboratorio'" v-model="request.estado"
								@change="updateState(request.id, request.estado, request.email)"
								class="border rounded px-2 py-1 w-[170px]">
								<option value="en espera">En espera</option>
								<option value="Agendado">Agendado</option>
								<option value="Rechazado">Rechazado</option>
								<option value="Terminado">Terminado</option>
							</select>
						</td>

						<td class="flex justify-center items-center py-4 gap-4">
							<button @click="eliminarSolicitud(request.id)" type="button" class="delete">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
									<path
										d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
								</svg>
							</button>
							<a v-if="request.tipo_form === 'impresion'" :href="`${BACKEND_URL}/download/${request.id}`"
								target="_blank" rel="noopener noreferrer" class="download">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
									<path
										d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v242.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64v-32c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
								</svg>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<nav v-if="validSession" class="pagination-controls">
			<button @click="currentPage > 1 && currentPage--" :disabled="currentPage <= 1">
				<img src="/icons/arrow.svg" alt="Flecha Izquierda Tabla" class="w-4 h-4 rotate-180" />
			</button>
			<span>PÁGINA {{ currentPage }}</span>
			<button @click="currentPage++" :disabled="currentPage >= Math.ceil(requests.length / itemsPerPage)">
				<img src="/icons/arrow.svg" alt="Flecha Derecha Tabla" class="w-4 h-4" />
			</button>
		</nav>
	</section>
</template>

<style scoped>
th {
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 8px;
	padding-bottom: 8px;
	text-align: left;
	font-size: 12px;
	line-height: 1rem;
	font-weight: 500;
	color: #6b7280;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.td {
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 8px;
	padding-bottom: 8px;
	font-size: 14px;
	line-height: 20px;
	white-space: nowrap;
}

select {
	outline: none;
}

select:focus {
	border: #ba0c2f 1px solid;
}

.pagination-controls {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 24px;
}

.pagination-controls button {
	padding: 8px 8px;
	background-color: #e5e7eb;
	/* Color de fondo del botón */
	color: #242424;
	border: none;
	border-radius: 9999px;
	cursor: pointer;
	transition: all 0.3s ease;
}

.pagination-controls button:hover {
	background-color: #ba0c2f;
	/* Color al pasar el mouse */
}

.pagination-controls button:disabled {
	background-color: #c0c0c0;
	/* Color de fondo cuando está deshabilitado */
	cursor: not-allowed;
	opacity: 0.7;
}

.pagination-controls span {
	font-size: 14px;
	font-weight: 600;
	color: #242424;
}

svg path {
	fill: #6b7280;
	transition: all 0.3s ease;
}

.delete:hover svg path {
	fill: #dc2626;
	transition: all 0.3s ease;
}

.download:hover svg path {
	fill: #286532;
	transition: all 0.3s ease;
}
</style>