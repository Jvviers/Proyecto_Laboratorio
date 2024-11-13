<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;
const noticias = ref([]);
const currentIndex = ref(0);
const slideWidth = 220;
const visibleItems = ref(4);

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

const calculateVisibleSlides = () => {
    const containerWidth = window.innerWidth;
    visibleSlides.value = Math.floor(containerWidth / slideWidth);
};

const nextSlide = () => {
    if (currentIndex.value < noticias.value.length - visibleItems.value) {
        currentIndex.value++;
    }
};

const prevSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    }
};

const updateVisibleItems = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) {
        visibleItems.value = 4;
    } else if (windowWidth >= 768) {
        visibleItems.value = 3;
    } else {
        visibleItems.value = 1;
    }
    currentIndex.value = Math.min(currentIndex.value, noticias.value.length - visibleItems.value);
};

onMounted(() => {
    getNoticias();
    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
});

watch(noticias, () => {
    updateVisibleItems();
    currentIndex.value = 0;
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateVisibleItems);
});
</script>

<template>
    <section class="flex flex-col justify-center items-center w-full py-6 px-2 md:px-32">
        <header class="flex flex-col justify-center pb-6 gap-3 w-full px-6 md:px-0">
            <h2 class="text-2xl font-bold text-center text-utal border-t border-gray-300 pt-6">NOTICIAS</h2>
            <h3 class="text-lg text-center">Aquí puedes ver las noticias más recientes.</h3>
        </header>
        <div class="flex items-center w-full overflow-hidden">
            <button @click="prevSlide" class="bg-gray-400 hover:bg-utal focus:outline-none rounded-full p-3"
                :disabled="currentIndex === 0">
                <img src="/icons/arrow.svg" alt="Flecha Izquierda Tabla" class="w-4 h-4 rotate-180" />
            </button>

            <div class="flex overflow-hidden w-full mx-2">
                <div class="flex transition-transform duration-300 ease-in-out"
                    :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }">
                    <div v-for="noticia in noticias" :key="noticia.id"
                        class="bg-white w-52 m-2 flex-shrink-0 border border-gray-300 rounded-lg shadow-md hover:scale-105 duration-300 ease-in-out overflow-hidden">
                        <img :src="noticia.url" :alt="'Imagen de noticia ' + noticia.id" loading="lazy"
                            class="w-full aspect-video object-cover" />
                        <h2 class="text-base font-bold leading-5 px-2 pt-2">{{ noticia.titulo }}</h2>
                        <p class="text-xs text-gray-500 px-2 pt-1 pb-2">{{ noticia.descripcion }}</p>
                    </div>
                </div>
            </div>

            <button @click="nextSlide" class="bg-gray-400 hover:bg-utal focus:outline-none rounded-full p-3"
                :disabled="currentIndex >= noticias.length - visibleItems">
                <img src="/icons/arrow.svg" alt="Flecha Derecha Tabla" class="w-4 h-4" />
            </button>
        </div>
    </section>
</template>
