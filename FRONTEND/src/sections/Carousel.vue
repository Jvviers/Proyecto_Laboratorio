<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

const images = ref([]);

const getImagenes = async () => {
	try {
		const response = await fetch(BACKEND_URL + '/carrusel', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const data = await response.json();
		images.value = data;
	} catch (error) {
		console.error('Error al obtener imagenes: ', error);
	}
};

const activeIndex = ref(0);
const isDragging = ref(false);
const startX = ref(0);

const nextSlide = () => {
	activeIndex.value = (activeIndex.value + 1) % images.value.length;
}

const prevSlide = () => {
	activeIndex.value = (activeIndex.value - 1 + images.value.length) % images.value.length;
};

const goToSlide = (index) => {
	activeIndex.value = index;
};

const startDrag = (event) => {
	isDragging.value = true;
	startX.value = event.clientX;
};

const onDrag = (event) => {
	if (!isDragging.value) return;

	const deltaX = event.clientX - startX.value;

	if (deltaX > 50) {
		prevSlide();
		isDragging.value = false;
	} else if (deltaX < -50) {
		nextSlide();
		isDragging.value = false;
	}
};

const endDrag = () => {
	isDragging.value = false;
};

onMounted(() => {
	getImagenes();

	autoSlideInterval = setInterval(() => {
		if (images.value.length > 0) {
			nextSlide();
		}
	}, 5000);
});

onBeforeUnmount(() => {
	if (autoSlideInterval) {
		clearInterval(autoSlideInterval);
	}
});
</script>

<template>
	<div class="relative w-full bg-[#eeeeee] z-10" @mousedown="startDrag" @mousemove="onDrag" @mouseup="endDrag"
		@mouseleave="endDrag">
		<!-- Carousel wrapper -->
		<div class="relative aspect-video overflow-hidden -z-20 mx-0 md:mx-32">
			<!-- Carrusel de items -->
			<div v-for="(image, index) in images" :key="index"
				class="absolute inset-0 transition-opacity duration-1000 ease-in-out aspect-video"
				:class="{ 'opacity-100': activeIndex === index, 'opacity-0': activeIndex !== index }">
				<img :src=image.url :alt="'imagen '+index+1" class="block aspect-video w-full" draggable="false" />
			</div>
		</div>
		<!-- Indicadores -->
		<div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
			<button v-for="(image, index) in images" :key="index" @click="goToSlide(index)"
				class="w-3 p-0 h-3 rounded-full hover:bg-utal transitions" :class="{
					'bg-utal': activeIndex === index,
					'bg-gray-200': activeIndex !== index,
				}" aria-label="Slide"></button>
		</div>
		<!-- Controles del slider -->
		<button type="button"
			class="px-4 mx-0 md:mx-32 absolute top-0 left-0 z-10 h-full outline-none bg-transparent hover:bg-transparent transitions"
			@click="prevSlide">
			<span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 transitions">
				<img src="/icons/arrow.svg" alt="Flecha Izquierda Carrusel" class="w-4 h-4 rotate-180" />
			</span>
		</button>
		<button type="button"
			class="px-4 mx-0 md:mx-32 absolute top-0 right-0 z-10 h-full outline-none bg-transparent hover:bg-transparent transitions"
			@click="nextSlide">
			<span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 transitions">
				<img src="/icons/arrow.svg" alt="Flecha Derecha Carrusel" class="w-4 h-4" />
			</span>
		</button>
	</div>
</template>

<style scoped>
button:hover {
	span {
		background-color: #ba0c2f;
	}
}
</style>
