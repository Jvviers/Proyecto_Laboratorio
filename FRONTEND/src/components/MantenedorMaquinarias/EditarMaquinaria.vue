<script setup>
import { ref, onMounted } from 'vue';
import { defineProps, defineEmits } from 'vue';

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

const maquinarias = ref([]);

const editarMaquinaria = async (id, name) => {
    try {
        const response = await fetch('http://localhost:3000/nombre-equipos', {
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
        console.error('Error al editar maquinaria: ', error);
    }
};

const getMaquinarias = async () => {
    try {
        const response = await fetch('http://localhost:3000/nombre-equipos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        maquinarias.value = data;
        maquinarias.value.forEach(maquinaria => maquinaria.disabled = true);
        maquinarias.value.forEach(maquinaria => maquinaria.color = '#e5e7eb');
    } catch (error) {
        console.error('Error al obtener maquinarias: ', error);
    }
};

const toggleEdicion = (id) => {
    const maquinaria = maquinarias.value.find(maquinaria => maquinaria.id === id);
    maquinaria.disabled = !maquinaria.disabled;
    maquinaria.color = maquinaria.disabled ? '#e5e7eb' : '#00cdcd';
};

onMounted(() => {
    getMaquinarias();
});
</script>
<template>
    <section class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">
        <h1 class="text-3xl text-center font-bold">Editar Maquinaria</h1>
        <div class="flex flex-col justify-center items-stretch w-full gap-1">
            <li v-for="maquinaria in maquinarias" :key="maquinaria.id" class="flex justify-between items-center px-2 w-full">
                <input type="text" :disabled="maquinaria.disabled" v-model="maquinaria.nombre"
                    @change="editarMaquinaria(maquinaria.id, maquinaria.nombre)" class="input" />
                <button class="ml-6" type="button" @click="toggleEdicion(maquinaria.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                        <path :fill="maquinaria.color"
                            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0l-30.1 30 97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2l-18.7-18.6zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5l167.3-167.4-98-98-167.3 167.4zM96 64c-53 0-96 43-96 96v256c0 53 43 96 96 96h256c53 0 96-43 96-96v-96c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                </button>
            </li>
        </div>
        <div class="flex w-full justify-center items-center gap-8">
            <button class="button" type="button" @click="closeModal">Volver</button>
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