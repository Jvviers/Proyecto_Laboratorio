<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

const props = defineProps({
    isModalOpen: Boolean,
    email: String, // Correo del solicitante recibido del padre
});

const emit = defineEmits(['close-modal']);

const closeModal = () => {
    emit('close-modal');
};

const titulo = ref('');
const contenido = ref('');

const enviarCorreo = async () => {
    closeModal();
    try {
        const response = await fetch(`${BACKEND_URL}/correo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: props.email, 
                titulo: titulo.value,
                contenido: contenido.value, 
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        console.log("Correo enviado con éxito");
    } catch (error) {
        console.error('Error al enviar correo: ', error);
    }
};

// Limpia el contenido cuando el modal se abre o cierra
watch(() => props.isModalOpen, (isOpen) => {
    if (!isOpen) contenido.value = ''; // Limpia contenido al cerrar
});
</script>

<template>
    <form @submit.prevent="enviarCorreo" class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">
        <h2 class="text-2xl font-bold text-center text-utal">Enviar Correo</h2>
        <div class="flex flex-col justify-start items-start w-full gap-1">
            <label for="titulo">Título del Correo</label>
            <input
                id="titulo"
                type="text"
                v-model="titulo"
                class="input w-full"
                placeholder="Escribe el título del correo aquí..."
                required
            />
        </div>
        <div class="flex flex-col justify-start items-start w-full gap-1">
            <label for="content">Enviar a: {{ email }}</label>
            <textarea class="input w-full h-48 resize-none" id="content" v-model="contenido"
                placeholder="Escribe el contenido del correo aquí..." required></textarea>
        </div>
        <div class="flex w-full justify-center items-center gap-8 mt-4">
            <button class="button-red" type="submit">Enviar</button>
            <button class="button" type="button" @click="closeModal">Cancelar</button>
        </div>
    </form>
</template>
