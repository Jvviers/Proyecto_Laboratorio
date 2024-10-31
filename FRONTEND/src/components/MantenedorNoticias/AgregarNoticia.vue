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

const title = ref('');
const description = ref('');
const file = ref(null);

const onFileChange = (event) => {
    file.value = event.target.files[0];
}

const agregarNoticia = async () => {
    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('title', title.value);
    formData.append('description', description.value);
    try {
        const response = await fetch(BACKEND_URL + '/noticias', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Se ha agregado: ', data);
        closeModal();
    } catch (error) {
        console.error('Error al agregar noticia: ', error);
    }
};
</script>
<template>
    <form @submit.prevent="agregarNoticia" class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">
        <div class="flex justify-center items-center w-full">
            <h1 class="text-2xl text-center font-bold">AGREGAR NOTICIA</h1>
        </div>
        <div class="flex flex-col justify-center items-center w-full gap-4">
            <div class="flex flex-col justify-start items-start w-full gap-1">
                <label for="title">Título:</label>
                <input placeholder="Título de la noticia" class="input w-full" type="text" id="title" v-model="title"
                    required />
            </div>
            <div class="flex flex-col justify-start items-start w-full gap-1">
                <label for="description">Descripción:</label>
                <textarea placeholder="Escriba aquí la descripción de la noticia" class="input w-full h-32 resize-none"
                    id="description" v-model="description" required />
            </div>
            <div class="flex justify-center items-center w-full">
                <button type="button" class="button relative overflow-hidden">SELECCIONAR IMAGEN
                    <input type="file" name="file" @change="onFileChange($event)" required
                        class="absolute top-0 left-0 w-full h-[60px] text-transparent opacity-0" />
                </button>
            </div>
            <span v-if="file != null" class="text-center text-sm">
                Archivo cargado: {{ file.name }}
            </span>
        </div>
        <div class="flex w-full justify-center items-center gap-8">
            <button class="button" type="submit">AGREGAR</button>
            <button class="button" type="button" @click="closeModal">CANCELAR</button>
        </div>
    </form>
</template>