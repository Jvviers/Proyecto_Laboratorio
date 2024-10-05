<template>
    <div class="relative w-full">
      <!-- Carousel wrapper --> 
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <!-- Carrusel de items -->
        <div
          v-for="(image, index) in images"
          :key="index"
          class="absolute inset-0 transition-opacity duration-700 ease-in-out"
          :class="{ 'opacity-100': activeIndex === index, 'opacity-0': activeIndex !== index }"
        >
          <img
            :src="image"
            class="block w-full h-full object-cover"
            alt="Carousel Image"
          />
        </div>
      </div>
      <!-- Indicadores -->
      <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button
          v-for="(image, index) in images"
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full"
          :class="{
            'bg-blue-500': activeIndex === index,
            'bg-gray-300': activeIndex !== index,
          }"
          aria-label="Slide"
        ></button>
      </div>
      <!-- Controles del slider -->
      <button
        type="button"
        class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        @click="prevSlide"
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        @click="nextSlide"
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      activeIndex: 0,
      images: [
       
      ],
    };
  },
  methods: {
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.activeIndex =
        (this.activeIndex - 1 + this.images.length) % this.images.length;
    },
    goToSlide(index) {
      this.activeIndex = index;
    },
  },
};
</script>

  
  <style scoped>
  /*por si queremos agregar estilos*/
  </style>