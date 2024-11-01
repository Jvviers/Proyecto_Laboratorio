<script setup>
import { ref, onMounted } from 'vue';
import { defineProps, defineEmits } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

// Recibe la propiedad isModalOpen
const props = defineProps({
    isModalOpen: Boolean
});

// Emitir eventos
const emit = defineEmits(['close-modal']);

// Función para cerrar el modal
const closeModal = () => {
    emit('close-modal');
};

const noticias = ref([]);

const editarNoticia = async (id, title, description, file) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('description', description);
    if (file != null) {
        formData.append('file', file);
        try {
            const response = await fetch(BACKEND_URL + '/noticias', {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Se ha editado: ', data);
        } catch (error) {
            console.error('Error al editar noticia: ', error);
        }
    } else {
        try {
            const response = await fetch(BACKEND_URL + '/noticiasWithoutFile/', {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Se ha editado: ', data);
        } catch (error) {
            console.error('Error al editar noticia: ', error);
        }
    }
};

const getNoticias = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/noticias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        noticias.value = data;
        noticias.value.forEach(noticia => noticia.disabled = true);
        noticias.value.forEach(noticia => noticia.color = '#e5e7eb');
        noticias.value.forEach(noticia => noticia.file = null);
    } catch (error) {
        console.error('Error al obtener noticias: ', error);
    }
};

const toggleEdicion = (id) => {
    const noticia = noticias.value.find(noticia => noticia.id === id);
    noticia.disabled = !noticia.disabled;
    noticia.color = noticia.disabled ? '#e5e7eb' : '#00cdcd';
};

const onFileChange = (id, event) => {
    const noticia = noticias.value.find(noticia => noticia.id === id);
    noticia.file = event.target.files[0];
}

onMounted(() => {
    getNoticias();
});
</script>
<template>
    <section class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full max-h-[80vh]">
        <h1 class="text-2xl text-center font-bold">EDITAR NOTICIA</h1>
        <div class="flex flex-col justify-start items-stretch w-full gap-1 overflow-y-scroll">
            <li v-for="noticia in noticias" :key="noticia.id"
                class="flex flex-col justify-start items-center gap-1 px-2 w-full">
                <div class="flex justify-between items-center w-full">
                    <span class="bg-gray-50 border border-gray-200 px-2 py-1 rounded w-full"
                        :disabled="noticia.disabled">{{ noticia.titulo }}</span>
                    <button class="ml-6 edit" type="button" @click="toggleEdicion(noticia.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                            <path :fill="noticia.color"
                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0l-30.1 30 97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2l-18.7-18.6zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5l167.3-167.4-98-98-167.3 167.4zM96 64c-53 0-96 43-96 96v256c0 53 43 96 96 96h256c53 0 96-43 96-96v-96c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="editarNoticia(noticia.id, noticia.titulo, noticia.descripcion, noticia.file)"
                    v-if="!noticia.disabled" class="flex flex-col justify-start items-center w-full gap-4 mb-6">
                    <div class="flex flex-col justify-start items-start w-full gap-1">
                        <label for="title">Título:</label>
                        <input placeholder="Título de la noticia" class="input w-full" type="text" id="title"
                            v-model="noticia.titulo" required />
                    </div>
                    <div class="flex flex-col justify-start items-start w-full gap-1">
                        <label for="description">Descripción:</label>
                        <textarea placeholder="Escriba aquí la descripción de la noticia"
                            class="input w-full h-32 resize-none" id="description" v-model="noticia.descripcion"
                            required />
                    </div>
                    <div class="flex justify-between items-center w-full gap-4">
                        <div class="flex justify-start items-center gap-2">
                            <button type="button" class="button relative overflow-hidden">CAMBIAR IMAGEN
                                <input type="file" name="file" @change="onFileChange(noticia.id, $event)"
                                    class="absolute top-0 left-0 w-full h-[60px] text-transparent opacity-0" />
                            </button>
                            <span v-if="noticia.file != null" class="text-center text-sm">
                                Archivo cargado: {{ noticia.file.name }}
                            </span>
                        </div>
                        <div class="flex justify-end items-center">
                            <button class="button" type="submit">EDITAR</button>
                        </div>
                    </div>
                </form>
            </li>
        </div>
        <div class="flex w-full justify-center items-center gap-8">
            <button class="button" type="button" @click="closeModal">VOLVER</button>
        </div>
    </section>
</template>

<style scoped>
.edit:hover svg path {
    fill: #00cdcd;
    transition: all 0.3s ease;
}

span:disabled {
    background-color: #e5e7eb;
    color: #9ca3af;
    transition: all 0.3s ease;
}
</style>