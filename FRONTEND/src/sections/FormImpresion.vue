<script setup>
import { onMounted, ref } from "vue";
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

// Variables de las entradas de texto
const solicitante = ref("");
const email = ref("");
const matricula = ref("");
const actividad = ref("");
const accessMessage = ref("");
const projectTypes = ref([]);
const materialTypes = ref([]);
const tipo_material = ref(null);
const tipo_proyecto = ref(null);
const file = ref(null);

const onFileChange = (event) => {
	file.value = event.target.files[0];
}


const getTipoMaterial = async () => {
	try {
		const response = await fetch(BACKEND_URL + "/tipo-material", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const data = await response.json();
		materialTypes.value = data;
	} catch (error) {
		console.error("Error al obtener el tipo de material: ", error);
	}
};

const getTipoProyecto = async () => {
	try {
		const response = await fetch(BACKEND_URL + "/tipo-proyecto", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const data = await response.json();
		projectTypes.value = data;
	} catch (error) {
		console.error("Error al obtener el tipo de proyecto: ", error);
	}
};

const postMateriales = async () => {
	const formData = new FormData();
	formData.append('file', file.value);
	formData.append('solicitante', solicitante.value);
	formData.append('email', email.value);
	formData.append('matricula', matricula.value);
	formData.append('actividad', actividad.value);
	formData.append('tipo_proyecto', tipo_proyecto.value);
	formData.append('tipo_material', tipo_material.value);
	try {
		const response = await fetch(BACKEND_URL + "/materiales", {
			method: "POST",
			body: formData,
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const data = await response.json();
		console.log("Solicitud enviada:", data);
		accessMessage.value = "Solicitud enviada correctamente";
		showAccessBanner();
		//Aquí vaciamos los campos 
		resetInputs();
	} catch (error) {
		console.error("Error al enviar solicitud:", error);
	}
};

const showAccessBanner = () => {
  setTimeout(() => {
    accessMessage.value = "";
  }, 4000);
};

const resetInputs = () => {
	solicitante.value = '';
	email.value = '';
	matricula.value = '';
	actividad.value = '';
	tipo_proyecto.value = null;
	tipo_material.value = null;
	file.value = null;
};
onMounted(() => {
	getTipoMaterial();
	getTipoProyecto();
});	
</script>

<template>
	<div></div>
	<div v-if="accessMessage" class="fixed top-32 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50">
		{{ accessMessage }}
	</div>

	<form @submit.prevent="postMateriales"
		class="flex flex-col justify-center items-center gap-4 my-4 w-full px-4 md:px-0">
		<h1 class="text-2xl text-center font-bold">SOLICITUD DE IMPRESIÓN</h1>
		<!-- Sección de formulario de solicitud de impresión -->
		<div class="flex flex-col justify-center items-center gap-4 mx-auto px-10 py-6">
			<div class="flex justify-between items-center w-full gap-4">
				<label for="solicitante">Solicitante:</label>
				<input class="text-input input" type="text" id="solicitante" v-model="solicitante" required />
			</div>
			<div class="flex justify-between items-center w-full gap-4">
				<label for="email">Email:</label>
				<input class="text-input input" type="email" id="email" v-model="email" required />
			</div>
			<div class="flex justify-between items-center w-full gap-4">
				<label for="matricula">Matrícula:</label>
				<input class="text-input input" type="text" id="matricula" v-model="matricula" required />
			</div>
			<div class="flex justify-between items-center w-full gap-4">
				<label for="actividad">Actividad:</label>
				<input class="text-input input" type="text" id="actividad" v-model="actividad" required />
			</div>
		</div>

		<!-- Sección de selección de materiales y proyectos -->
		<div class="flex flex-wrap gap-8 px-4 justify-evenly w-full">
			<!-- Tipo Proyecto -->
			<div class="flex flex-col justify-start gap-4 p-2">
				<h2 class="font-bold text-center text-2xl">TIPO DE PROYECTO</h2>
				<ul class="flex flex-col gap-2">
					<li v-for="type in projectTypes" :key="type.id" class="flex items-center">
						<input type="radio" v-model="tipo_proyecto" :id="'project-' + type.id" :value="type.nombre"
							class="mr-3 w-6 h-6" required />
						<label :for="'project-' + type.id" class="text-md">{{
							type.nombre
						}}</label>
					</li>
				</ul>
			</div>
			<!-- Tipo Material -->
			<div class="flex flex-col justify-center gap-4 p-2">
				<h2 class="font-bold text-center text-2xl">TIPO DE MATERIAL</h2>
				<ul class="flex flex-col gap-2">
					<li v-for="material in materialTypes" :key="material.id" class="flex items-center">
						<input type="radio" v-model="tipo_material" :id="'material-' + material.id"
							:value="material.nombre" class="mr-3 w-6 h-6" required />
						<label :for="'material-' + material.id" class="text-md">{{
							material.nombre
						}}</label>
					</li>
				</ul>
			</div>
			<!-- Subir archivo -->
			<div class="flex flex-col gap-1 justify-start items-center">
				<div class="flex flex-col justify-start items-center gap-3 md:gap-8 p-2">
					<h2 class="font-bold text-center text-2xl">ARCHIVO</h2>
					<button type="button" class="button relative overflow-hidden">Seleccionar Archivo
						<input type="file" name="file" @change="onFileChange($event)" required
							class="absolute top-0 left-0 w-full h-[60px] text-transparent opacity-0" />
					</button>
				</div>
				<span v-if="file != null" class="text-center text-sm">
					Archivo cargado: {{ file.name }}
				</span>
			</div>
		</div>
		<!-- Botón enviar -->
		<div class="flex justify-center py-4">
			<button class="button" type="submit">
				ENVIAR
			</button>
		</div>
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
