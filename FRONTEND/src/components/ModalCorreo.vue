<script setup>
import { ref, watch } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

const props = defineProps({
    isModalOpen: Boolean,
    email: String, 
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
        const contenidoHtml = contenido.value.replace(/\n/g, '<br>');
        const response = await fetch(`${BACKEND_URL}/correo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: props.email, 
                titulo: titulo.value,
                contenido: contenidoHtml, 
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
    if (!isOpen) contenido.value = ''; 
});
</script>

<template>
    <form @submit.prevent="enviarCorreo" class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">
        <div class="flex justify-center items-center w-full">
            <h2 class="text-2xl font-bold text-center text-utal">ENVIAR CORREO</h2>
        </div>
        <div class="flex flex-col justify-center items-center w-full gap-4">
            <div class="flex flex-col justify-start items-start w-full gap-1">
                <span class="text-gray-600 px-2 border border-gray-300 rounded bg-gray-200">Para: {{ email }}</span>
            </div>
            <div class="flex flex-col justify-start items-start w-full gap-1">
                <label for="title">Título del correo:</label>
                <input placeholder="Escribe el título del correo aquí:" class="input w-full" type="text" id="title"
                    v-model="titulo" required />
            </div>
            <div class="flex flex-col justify-start items-start w-full gap-1">
                <label for="content">Contenido del correo:</label>
                <span class="text-gray-600 px-2 border border-gray-300 rounded bg-gray-200">Estimado/a</span>
                <textarea class="input w-full h-40 resize-none" id="content" v-model="contenido"
                placeholder="Escribe el contenido del correo aquí:" required></textarea>
                <span class="text-gray-600 px-2 border border-gray-300 rounded bg-gray-200">Atentamente, La Administración</span>
            </div>
        </div>
        <div class="flex w-full justify-center items-center gap-8 mt-4">
            <button class="button-red" type="submit">ENVIAR</button>
            <button class="button" type="button" @click="closeModal">CANCELAR</button>
        </div>
    </form>
</template>
