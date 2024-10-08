<script>
export default {
  data() {
    return {
      activeIndex: 0,
      images: [
        "/images/ciervo_en_paisaje.jpg",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      ],
      isDragging: false, 
      startX: 0, 
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
    startDrag(event) {
      this.isDragging = true;
      this.startX = event.clientX; 
    },
    onDrag(event) {
      if (!this.isDragging) return;

      const deltaX = event.clientX - this.startX; 

      if (deltaX > 50) {
        // Si arrastra a la derecha
        this.prevSlide();
        this.isDragging = false; 
      } else if (deltaX < -50) {
      
        this.nextSlide();
        this.isDragging = false; 
      }
    },
    endDrag() {
      this.isDragging = false; 
    },
  },
};
</script>

<template>
  <div
    class="relative w-full"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
  >
    <!-- Carousel wrapper -->
    <div class="relative h-[80vh] overflow-hidden">
      <!-- Carrusel de items -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="{ 'opacity-100': activeIndex === index, 'opacity-0': activeIndex !== index }"
      >
        <img
          :src="image"
          class="block w-full h-full object-cover"
          alt="Carousel Image"
          draggable="false"
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

<style scoped></style>
