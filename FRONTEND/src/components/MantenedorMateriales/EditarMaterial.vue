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

const materiales = ref([]);

const editarMaterial = async (id, name) => {
    try {
        const response = await fetch(BACKEND_URL + '/tipo-material', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: name,
                id: id,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Se ha editado: ', data);
    } catch (error) {
        console.error('Error al editar material: ', error);
    }
};

const getMateriales = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/tipo-material', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        materiales.value = data;
        materiales.value.forEach(material => material.disabled = true);
        materiales.value.forEach(material => material.color = '#e5e7eb');
    } catch (error) {
        console.error('Error al obtener materiales: ', error);
    }
};

const toggleEdicion = (id) => {
    const material = materiales.value.find(material => material.id === id);
    material.disabled = !material.disabled;
    material.color = material.disabled ? '#e5e7eb' : '#00cdcd';
};

onMounted(() => {
    getMateriales();
});
</script>
<template>
    <section class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full max-h-[80vh]">
        <h1 class="text-2xl text-center font-bold">EDITAR MATERIAL</h1>
        <div class="flex flex-col justify-center items-stretch w-full gap-1 overflow-y-scroll">
            <li v-for="material in materiales" :key="material.id" class="flex justify-between items-center px-2 w-full">
                <input type="text" :disabled="material.disabled" v-model="material.nombre"
                    @change="editarMaterial(material.id, material.nombre)" class="input" />
                <button class="ml-6" type="button" @click="toggleEdicion(material.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                        <path :fill="material.color"
                            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0l-30.1 30 97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2l-18.7-18.6zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5l167.3-167.4-98-98-167.3 167.4zM96 64c-53 0-96 43-96 96v256c0 53 43 96 96 96h256c53 0 96-43 96-96v-96c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
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
button:hover svg path {
    fill: #00cdcd;
    transition: all 0.3s ease;
}

input:disabled {
    background-color: #e5e7eb;
    color: #9ca3af;
    transition: all 0.3s ease;
}
</style>