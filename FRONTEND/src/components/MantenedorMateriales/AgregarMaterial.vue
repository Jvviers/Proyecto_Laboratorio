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

const agregarMaterial = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/tipo-material', {
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
        console.error('Error al agregar material: ', error);
    }
};
</script>
<template>
    <form @submit.prevent="agregarMaterial" class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">
        <h1 class="text-2xl text-center font-bold">AGREGAR MATERIAL</h1>
        <div class="flex justify-between items-center w-full gap-4">
            <label for="name">Nombre:</label>
            <input class="input" type="text" id="name" v-model="name" required />
        </div>
        <div class="flex w-full justify-center items-center gap-8">
            <button class="button" type="submit">AGREGAR</button>
            <button class="button" type="button" @click="closeModal">CANCELAR</button>
        </div>
    </form>
</template>