<script setup>
import { ref } from 'vue';
import AgregarLogo from './AgregarLogo.vue';
import EliminarLogo from './EliminarLogo.vue';

// Estados para controlar la visibilidad de los modales
const modalAgregar = ref(false);
const modalEliminar = ref(false);

// Funciones para abrir y cerrar los modales
const toggleModalAgregar = () => {
    modalAgregar.value = !modalAgregar.value;
};
const toggleModalEliminar = () => {
    modalEliminar.value = !modalEliminar.value;
};
</script>

<template>
    <div class="flex flex-col justify-center items-center gap-2 px-8 py-4 w-[200px] border border-gray-300 shadow-md rounded">
        <h2 class="text-lg font-bold text-utal">LOGOS</h2>
        <div class="flex flex-col justify-center items-center gap-1 w-full">
            <button class="button w-full" @click="toggleModalAgregar">AGREGAR</button>
            <button class="button w-full" @click="toggleModalEliminar">ELIMINAR</button>
        </div>
    </div>

    <!-- Modales -->
	<div v-if="modalAgregar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
		<div class="bg-white p-4 rounded shadow-lg relative w-3/4 md:w-1/2">
			<AgregarLogo :isModalOpen="modalAgregar" @close-modal="toggleModalAgregar" />
		</div>
	</div>
    <div v-if="modalEliminar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
		<div class="bg-white p-4 rounded shadow-lg relative w-3/4">
			<EliminarLogo :isModalOpen="modalEliminar" @close-modal="toggleModalEliminar" />
		</div>
	</div>
</template>