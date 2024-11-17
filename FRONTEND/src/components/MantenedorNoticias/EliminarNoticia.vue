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

// Función para cerrar el modal desde dentro de Register
const closeModal = () => {
    emit('close-modal');
};

const noticias = ref([]);

const deleteNoticia = async (id, public_id) => {
    try {
        const response = await fetch(BACKEND_URL + '/noticias', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                public_id: public_id,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        /* console.log('Se ha eliminado: ', data); */
        getNoticias();
    } catch (error) {
        console.error('Error al eliminar noticia: ', error);
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
    } catch (error) {
        console.error('Error al obtener noticias: ', error);
    }
};

onMounted(() => {
    getNoticias();
});
</script>
<template>
    <section class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full max-h-[80vh]">
        <h2 class="text-2xl font-bold text-center text-utal">ELIMINAR NOTICIA</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll">
            <li v-for="noticia in noticias" :key="noticia.id"
                class="flex justify-between items-start w-full relative">
                <div class="flex flex-col justify-start items-start w-full p-2 gap-2 text-start border border-gray-200 rounded-lg shadow-md">
                    <img :src="noticia.url" :alt="'imagen ' + noticia.id" class="aspect-video w-full" />
                    <h2 class="text-base font-bold leading-5">{{ noticia.titulo }}</h2>
                    <p class="text-xs text-gray-500">{{ noticia.descripcion }}</p>
                </div>
                <button class="absolute top-0 right-0 p-4" type="button"
                    @click="deleteNoticia(noticia.id, noticia.public_id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                        <path
                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                    </svg>
                </button>
            </li>
        </div>
        <div class="flex w-full justify-center items-center gap-8">
            <button class="button" type="button" @click="closeModal">CERRAR</button>
        </div>
    </section>
</template>

<style scoped>
svg path {
    fill: #9d9d9d;
    transition: all 0.3s ease;
}

button:hover svg path {
    fill: #dc2626;
    transition: all 0.3s ease;
}
</style>