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
	<form @submit.prevent="postEquipos" class="flex flex-col justify-center items-center gap-4 my-4 w-full">
		<h1 class="text-3xl text-center font-bold">Equipos</h1>
		<div class="flex flex-col justify-center items-center gap-4 mx-auto px-10 py-6">
			<div class="flex justify-between items-center w-full gap-4">
				<label for="solicitante">Solicitante:</label>
				<input required class="text-input input" type="text" id="solicitante" v-model="solicitante" />
			</div>
			<div class="flex justify-between items-center w-full gap-4">
				<label for="email">Email:</label>
				<input required class="text-input input" type="email" id="email" v-model="email" />
			</div>
			<div class="flex justify-between items-center w-full gap-4">
				<label for="matricula">Matrícula:</label>
				<input required class="text-input input" type="text" id="matricula" v-model="matricula" />
			</div>
			<div class="flex justify-between items-center w-full gap-4">
				<label for="actividad">Actividad:</label>
				<input required class="text-input input" type="text" id="actividad" v-model="actividad" />
			</div>
		</div>
		<div class="flex flex-col justify-center gap-4 p-2">
			<h2 class="font-bold text-center text-2xl">Equipos a utilizar</h2>
			<div class="flex flex-col gap-2">
				<li v-for="equipo in equiposTypes" :key="equipo.id" class="flex items-center">
					<input type="checkbox" v-model="equipo.checked" :id="'equipo-' + equipo.id" class="mr-3 w-6 h-6" />
					<label :for="'equipo-' + equipo.id" class="text-md">{{
						equipo.nombre
					}}</label>
				</li>
			</div>
		</div>
		<button class="button" type="submit">Enviar</button>
	</form>
</template>

<style scoped>
.text-input {
	width: 200px;

	@media (min-width: 768px) {
		width: 300px;
	}
}
</style>
