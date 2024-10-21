<script setup lang="ts">
import { ref } from 'vue';
import Register from './Register.vue';

// Estado para controlar la visibilidad del modal
const isModalOpen = ref(false);

// Función para abrir y cerrar el modal
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
}
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-2 py-2 border border-gray-400 w-[200px] rounded">
    <h2 class="text-xl font-bold">Encargados</h2>
    <div class="flex flex-col justify-center items-center gap-1 w-full px-8">
      <button class="button w-full" @click="toggleModal">Agregar</button>
      <button class="button w-full">Eliminar</button>
      <button class="button w-full">Editar</button>
    </div>
  </div>

  <!-- Modal para el componente Register -->
  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded shadow-lg relative">
      <button class="absolute top-2 right-2 hover:text-white rounded-full bg-gray-200 hover:bg-red-600 px-2 transitions" @click="toggleModal">x</button>
      <Register />
    </div>
  </div>
</template>