<script setup>
import { ref } from 'vue';
import AgregarMaterial from './AgregarMaterial.vue';
import EliminarMaterial from './EliminarMaterial.vue';
import EditarMaterial from './EditarMaterial.vue';

// Estados para controlar la visibilidad de los modales
const modalAgregar = ref(false);
const modalEliminar = ref(false);
const modalEditar = ref(false);

// Funciones para abrir y cerrar los modales
const toggleModalAgregar = () => {
    modalAgregar.value = !modalAgregar.value;
};
const toggleModalEliminar = () => {
    modalEliminar.value = !modalEliminar.value;
};
const toggleModalEditar = () => {
    modalEditar.value = !modalEditar.value;
};
</script>

<template>
    <div class="flex flex-col justify-center items-center gap-2 px-8 py-4 w-[200px] border border-gray-300 shadow-md rounded">
        <h2 class="text-lg font-bold text-utal">MATERIALES</h2>
        <div class="flex flex-col justify-center items-center gap-1 w-full">
            <button class="button w-full" @click="toggleModalAgregar">AGREGAR</button>
            <button class="button w-full" @click="toggleModalEliminar">ELIMINAR</button>
            <button class="button w-full" @click="toggleModalEditar">EDITAR</button>
        </div>
    </div>

    <!-- Modales -->
	<div v-if="modalAgregar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
		<div class="bg-white p-4 rounded shadow-lg relative">
			<AgregarMaterial :isModalOpen="modalAgregar" @close-modal="toggleModalAgregar" />
		</div>
	</div>
    <div v-if="modalEliminar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
		<div class="bg-white p-4 rounded shadow-lg relative">
			<EliminarMaterial :isModalOpen="modalEliminar" @close-modal="toggleModalEliminar" />
		</div>
	</div>
    <div v-if="modalEditar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
		<div class="bg-white p-4 rounded shadow-lg relative">
			<EditarMaterial :isModalOpen="modalEditar" @close-modal="toggleModalEditar" />
		</div>
	</div>
</template>