<script setup>
import { onMounted, ref } from "vue";
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

// Variables del formulario
const solicitante = ref("");
const email = ref("");
const matricula = ref("");
const actividad = ref("");
const accessMessage = ref("");
const equiposTypes = ref([]);

const getNombreEquipo = async () => {
	try {
		const response = await fetch(BACKEND_URL + "/nombre-equipos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const data = await response.json();
		equiposTypes.value = data;
		equiposTypes.value.forEach((equipo) => {
			equipo.checked = false;
		});
	} catch (error) {
		console.error("Error al obtener el nombre: ", error);
	}
};

onMounted(() => {
	getNombreEquipo();
});

const idSolicitud = ref();

const showAccessBanner = () => {
	accessMessage.value = "Solicitud enviada exitosamente!";
	setTimeout(() => {
		accessMessage.value = "";
	}, 4000);
};

const resetInputs = () => {
	solicitante.value = "";
	email.value = "";
	matricula.value = "";
	actividad.value = "";
	equiposTypes.value.forEach((equipo) => {
		equipo.checked = false;
	});
};

const postEquipos = async () => {
	try {
		const response = await fetch(BACKEND_URL + "/equipos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				solicitante: solicitante.value,
				email: email.value,
				matricula: matricula.value,
				actividad: actividad.value,
			}),
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const data = await response.json();
		console.log("Solicitud enviada:", data);
		idSolicitud.value = data.insertId;
		showAccessBanner();
	} catch (error) {
		console.error("Error al enviar la solicitud:", error);
	}

	for (const equipo of equiposTypes.value) {
		console.log("Equipo:", equipo);
		console.log("idSolicitud:", idSolicitud.value);
		try {
			const response = await fetch(BACKEND_URL + "/equipo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					ref_sol: idSolicitud.value,
					nombre_equipo: equipo.nombre,
				}),
			});
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			const data = await response.json();
			console.log("Equipo agregado:", data);

			//aqui ira los reset inputs
			resetInputs();
		} catch (error) {
			console.error("Error al enviar la solicitud:", error);
		}
	}
};
</script>

<template>
	<div v-if="accessMessage" class="fixed top-32 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50">
		{{ accessMessage }}
	</div>
	<form @submit.prevent="postEquipos"
		class="flex flex-col justify-center items-center gap-4 py-12 px-8 md:px-32 w-full">
		<header class="flex flex-col justify-center gap-3 w-full">
			<h2 class="text-2xl font-bold text-center text-utal">LABORATORIO</h2>
			<h3 class="text-lg text-center">Aquí puedes solicitar la realización de tu laboratorio</h3>
		</header>
		<div class="flex flex-col lg:flex-row justify-center items-start gap-2 w-full border border-gray-300 rounded-lg shadow-md">
			<div class="flex flex-col justify-start w-3/4 lg:w-1/2 items-center gap-4 mx-auto px-8 py-6">
				<div class="flex flex-col justify-start items-start w-full gap-1">
					<label for="solicitante">Solicitante:</label>
					<input class="input w-full" type="text" id="solicitante" v-model="solicitante"
						placeholder="Nombre del solicitante" required />
				</div>
				<div class="flex flex-col justify-start items-start w-full gap-1">
					<label for="email">Email:</label>
					<input class="input w-full" type="email" id="email" v-model="email"
						placeholder="Correo del solicitante" required />
				</div>
				<div class="flex flex-col justify-start items-start w-full gap-1">
					<label for="matricula">Matrícula:</label>
					<input class="input w-full" type="text" id="matricula" v-model="matricula"
						placeholder="Matrícula del solicitante" required />
				</div>
				<div class="flex flex-col justify-start items-start w-full gap-1">
					<label for="actividad">Actividad:</label>
					<input class="input w-full" type="text" id="actividad" v-model="actividad"
						placeholder="Actividad a realizar" required />
				</div>
			</div>
			<div class="flex flex-col justify-start w-3/4 lg:w-1/2 items-start gap-4 mx-auto px-8 py-6">
				<header class="flex flex-col justify-center gap-3 w-full">
					<h3 class="text-base text-center lg:text-start">Selecciona los equipos que vas a utilizar:</h3>
				</header>
				<div class="flex flex-col justify-center items-start gap-2">
					<li v-for="equipo in equiposTypes" :key="equipo.id" class="flex items-center">
						<input type="checkbox" v-model="equipo.checked" :id="'equipo-' + equipo.id"
							class="mr-3 w-6 h-6 accent-utal" />
						<label :for="'equipo-' + equipo.id" class="text-md">{{
							equipo.nombre
						}}</label>
					</li>
				</div>
			</div>
		</div>
		<button class="button" type="submit">ENVIAR</button>
	</form>
</template>