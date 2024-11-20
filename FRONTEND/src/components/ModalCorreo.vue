<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

const props = defineProps({
    isModalOpen: Boolean,
    email: String,
});

const emit = defineEmits(['close-modal']);

const closeModal = () => {
    emit('close-modal');
};

const email = ref(props.email);
const contenido = ref('');

const enviarCorreo = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/correo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                contenido: contenido.value,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        closeModal();
    } catch (error) {
        console.error('Error al enviar correo: ', error);
    }
};
</script>
<template>
    <form @submit.prevent="enviarCorreo" class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">
        <h2 class="text-2xl font-bold text-center text-utal">ENVIAR CORREO</h2>
        <div class="flex flex-col justify-start items-start w-full gap-1">
            <label for="content">Mensaje para: {{ email }}</label>
            <textarea class="input w-full h-48 resize-none" id="content" v-model="contenido"
            placeholder="Contenido del correo" required></textarea>
        </div>
        <div class="flex w-full justify-center items-center gap-8 mt-4">
            <button class="button-red" type="submit">ENVIAR</button>
            <button class="button" type="button" @click="closeModal">CANCELAR</button>
        </div>
    </form>
</template>