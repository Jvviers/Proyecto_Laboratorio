<script setup>
import { ref, onMounted } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

const logos = ref([]);

const getLogos = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/logos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        logos.value = data;
    } catch (error) {
        console.error('Error al obtener logos: ', error);
    }
};

onMounted(() => {
    getLogos();
});
</script>

<template>
    <section class="flex flex-col w-full py-6 px-8 md:px-32">
        <header class="flex flex-col justify-center gap-3 w-full border-t border-gray-300 py-6">
            <h2 class="text-2xl font-bold text-center text-utal">LABORATORIOS</h2>
            <h3 class="text-lg text-center">Estos son nuestros laboratorios asociados.</h3>
        </header>
        <div class="flex flex-wrap justify-center items-center gap-10 w-full py-6">
            <li v-for="(logo, index) in logos" :key="index" class="flex justify-center items-center">
                <div class="w-48 flex justify-center border-2 border-utal border-dashed rounded-full p-2 overflow-hidden">
                    <img :src="logo.url" :alt="'logo '+index" class="h-20" />
                </div>
            </li>
        </div>
    </section>
</template>