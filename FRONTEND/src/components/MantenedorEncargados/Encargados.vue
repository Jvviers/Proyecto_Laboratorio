<script setup>
import { ref } from 'vue';
import Register from './Register.vue';
import EliminarEncargado from './EliminarEncargado.vue';
import EditarEncargado from './EditarEncargado.vue';

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
    <div class="flex flex-col justify-center items-center gap-2 py-2 border border-gray-400 w-[200px] rounded">
        <h2 class="text-xl font-bold">Encargados</h2>
        <div class="flex flex-col justify-center items-center gap-1 w-full px-8">
            <button class="button w-full" @click="toggleModalAgregar">Agregar</button>
            <button class="button w-full" @click="toggleModalEliminar">Eliminar</button>
            <button class="button w-full" @click="toggleModalEditar">Editar</button>
        </div>
    </div>

    <!-- Modales -->
	<div v-if="modalAgregar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-white p-4 rounded shadow-lg relative">
			<Register :isModalOpen="modalAgregar" @close-modal="toggleModalAgregar" />
		</div>
	</div>
    <div v-if="modalEliminar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-white p-4 rounded shadow-lg relative">
			<EliminarEncargado :isModalOpen="modalEliminar" @close-modal="toggleModalEliminar" />
		</div>
	</div>
    <div v-if="modalEditar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-white p-4 rounded shadow-lg relative">
			<EditarEncargado :isModalOpen="modalEditar" @close-modal="toggleModalEditar" />
		</div>
	</div>
</template>