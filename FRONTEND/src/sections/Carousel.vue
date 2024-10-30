<script>
export default {
  data() {
    return {
      activeIndex: 0,
      images: [
        { url: "/images/paisaje.jpg", alt: "paisaje" },
        { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", alt: "rostro 1" },
        { url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", alt: "rostro 2" },
        { url: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", alt: "rostro 3" },
        { url: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", alt: "rostro 4" },
        { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", alt: "rostro 5" },
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
  <div class="relative w-full bg-[#eeeeee] z-10" @mousedown="startDrag" @mousemove="onDrag" @mouseup="endDrag" @mouseleave="endDrag">
    <!-- Carousel wrapper -->
    <div class="relative aspect-video overflow-hidden -z-20 mx-0 md:mx-32">
      <!-- Carrusel de items -->
      <div v-for="(image, index) in images" :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="{ 'opacity-100': activeIndex === index, 'opacity-0': activeIndex !== index }">
        <img :src=image.url :alt=image.alt class="block w-full h-full object-cover" draggable="false" />
      </div>
    </div>
    <!-- Indicadores -->
    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      <button v-for="(image, index) in images" :key="index" @click="goToSlide(index)" class="w-3 p-0 h-3 rounded-full hover:bg-utal transitions"
        :class="{
          'bg-utal': activeIndex === index,
          'bg-gray-200': activeIndex !== index,
        }" aria-label="Slide"></button>
    </div>
    <!-- Controles del slider -->
    <button type="button" class="px-4 mx-0 md:mx-32 absolute top-0 left-0 z-10 h-full outline-none bg-transparent hover:bg-transparent transitions"
      @click="prevSlide">
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 transitions">
        <img src="/icons/arrow.svg" alt="Flecha Izquierda Carrusel" class="w-4 h-4 rotate-180" />
      </span>
    </button>
    <button type="button" class="px-4 mx-0 md:mx-32 absolute top-0 right-0 z-10 h-full outline-none bg-transparent hover:bg-transparent transitions"
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
    background-color: #00cdcd;
  }
}
</style>
