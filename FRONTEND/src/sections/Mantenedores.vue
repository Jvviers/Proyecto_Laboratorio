<script setup>
import { ref, onMounted } from 'vue';
import Encargados from "../components/MantenedorEncargados/Encargados.vue";
import Maquinarias from "../components/MantenedorMaquinarias/Maquinarias.vue"
import Proyectos from "../components/MantenedorProyectos.vue/Proyectos.vue"
import Materiales from "../components/MantenedorMateriales/Materiales.vue"
import ImagenesCarrusel from '../components/MantenedorCarrusel/ImagenesCarrusel.vue';
import Noticias from "../components/MantenedorNoticias/Noticias.vue"
import Logos from '../components/MantenedorLogos/Logos.vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

const userRole = ref(false);
const validSession = ref(false);

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
			userRole.value = data.is_admin;
			/* console.log('userRole:', userRole.value); */
		}
	} catch (err) {
		console.error('Error al validar sesión:', err);
	}
};

onMounted(() => {
	validateSession();
});
</script>

<template>
	<section v-if="validSession && userRole"
		class="flex flex-col justify-center items-center w-full px-8 md:px-32 py-6 mt-6">
		<div class="flex flex-col justify-center items-center gap-2 w-full border-t border-gray-300 pt-6">
			<h2 class="text-2xl text-center font-bold text-utal">MANTENEDORES</h2>
			<h3 class="text-lg text-center">Aquí puedes gestionar los encargados, maquinarias, proyectos, materiales, carrusel, y noticias.</h3>
		</div>
		<div class="flex flex-wrap justify-evenly items-center gap-8 py-8">
			<Encargados />
			<Maquinarias />
			<Proyectos />
			<Materiales />
		</div>
		<div class="flex flex-wrap justify-evenly items-center gap-8 pb-8">
			<ImagenesCarrusel />
			<Noticias />
			<Logos />
		</div>
	</section>
</template>