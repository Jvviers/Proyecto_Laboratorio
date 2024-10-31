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

const encargados = ref([]);

const eliminarEncargado = async (id) => {
    try {
        const response = await fetch(BACKEND_URL + '/encargado', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Se ha eliminado: ', data);
        getEncargados();
    } catch (error) {
        console.error('Error al eliminar encargado: ', error);
    }
};

const getEncargados = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/encargados', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        encargados.value = data;
    } catch (error) {
        console.error('Error al obtener encargados: ', error);
    }
};

onMounted(() => {
    getEncargados();
});
</script>
<template>
    <section class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">
        <h1 class="text-2xl text-center font-bold">ELIMINAR ENCARGADO</h1>
        <div class="flex flex-col justify-center items-stretch w-full gap-1">
            <li v-for="encargado in encargados" :key="encargado.id" class="flex justify-between items-center px-2 w-full">
                <span class="bg-gray-50 border border-gray-200 px-2 py-1 rounded w-full">{{ encargado.email }}</span>
                <button class="ml-6" type="button" @click="eliminarEncargado(encargado.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                        <path
                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                    </svg>
                </button>
            </li>
        </div>
        <div class="flex w-full justify-center items-center gap-8">
            <button class="button" type="button" @click="closeModal">VOLVER</button>
        </div>
    </section>
</template>

<style scoped>
svg path {
    fill: #e5e7eb;
    transition: all 0.3s ease;
}

button:hover svg path {
    fill: #ef4444;
    transition: all 0.3s ease;
}
</style>