<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

// Recibe la propiedad isModalOpen
const props = defineProps({
    isModalOpen: Boolean
});

// Emitir eventos
const emit = defineEmits(['close-modal']);

// Función para cerrar el modal desde dentro de Register
const closeModal = () => {
    emit('close-modal');
};

const name = ref('');

const agregarProyecto = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/tipo-proyecto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: name.value,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Se ha agregado: ', data);
        closeModal();
    } catch (error) {
        console.error('Error al agregar proyecto: ', error);
    }
};
</script>
<template>
    <form @submit.prevent="agregarProyecto" class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">	
        <h1 class="text-3xl text-center font-bold">Agregar Proyecto</h1>
        <div class="flex justify-between items-center w-full gap-4">
            <label for="name">Nombre:</label>
            <input class="text-input input" type="text" id="name" v-model="name" required />
        </div>
        <div class="flex w-full justify-center items-center gap-8">
            <button class="button" type="submit">Agregar</button>
            <button class="button" type="button" @click="closeModal">Cancelar</button>
        </div>
    </form>
</template>