<script setup>
import { ref, onMounted } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

const noticias = ref([]);
const currentIndex = ref(0);
const slideWidth = 224;

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

const nextSlide = () => {
    if (currentIndex.value < noticias.value.length - 4) {
        currentIndex.value++;
    }
};

const prevSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    }
};

onMounted(() => {
    getNoticias();
});
</script>

<template>
    <section class="flex flex-col justify-center items-center w-full py-6 px-8 md:px-32">
        <header class="flex flex-col justify-center py-6 border-t border-gray-300 gap-3 w-full">
            <h2 class="text-2xl font-bold text-center text-utal">NOTICIAS</h2>
            <h3 class="text-lg text-center">Aquí puedes ver las noticias más recientes</h3>
        </header>
        <div class="flex items-center w-full overflow-hidden">
            <button @click="prevSlide" class="bg-gray-400 hover:bg-utal focus:outline-none rounded-full p-3">
                <!-- Icono Izquierda -->
                <img src="/icons/arrow.svg" alt="Flecha Izquierda Tabla" class="w-4 h-4 rotate-180" />
            </button>

            <div class="flex overflow-hidden w-full mx-2">
                <div class="flex transition-transform duration-300 ease-in-out"
                    :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }">
                    <div v-for="noticia in noticias" :key="noticia.id"
                        class="bg-white w-56 m-2 flex-shrink-0 border border-gray-300 rounded-lg shadow-md hover:scale-105 duration-300 ease-in-out overflow-hidden">
                        <img :src="noticia.url" :alt="'Imagen de noticia ' + noticia.id" loading="lazy"
                            class="w-full aspect-video object-cover" />
                        <h2 class="text-base font-bold leading-5 px-2 pt-2">{{ noticia.titulo }}</h2>
                        <p class="text-xs text-gray-500 px-2 pt-1 pb-2">{{ noticia.descripcion }}</p>
                    </div>
                </div>
            </div>

            <button @click="nextSlide" class="bg-gray-400 hover:bg-utal focus:outline-none rounded-full p-3">
                <!-- Icono Derecha -->
                <img src="/icons/arrow.svg" alt="Flecha Derecha Tabla" class="w-4 h-4" />
            </button>
        </div>
    </section>
</template>