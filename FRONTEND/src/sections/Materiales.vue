<script>
export default {
  data() {
    return {
      projectTypes: [
        { id: 1, name: 'Personal', checked: false },
        { id: 2, name: 'Curso', checked: false },
        { id: 3, name: 'Proyecto', checked: false },
        { id: 4, name: 'IPSUM', checked: false },
        { id: 5, name: 'IPSUM', checked: false },
      ],
      materialTypes: [
        { id: 1, name: 'PLA', checked: false },
        { id: 2, name: 'ABS', checked: false },
        { id: 3, name: 'LOREM', checked: false },
        { id: 4, name: 'LOREM', checked: false },
        { id: 5, name: 'LOREM', checked: false },
      ],
      file: null
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    }
  }
};
</script>

<template>
  <div class="flex flex-wrap justify-evenly w-full">
    <!-- Tipo Proyecto -->
    <div class="flex flex-col justify-center gap-4 p-2">
      <h2 class="font-bold text-center text-2xl">Tipo proyecto</h2>
      <div class="flex flex-col gap-2">
        <li v-for="type in projectTypes" :key="type.id" class="flex items-center">
          <input type="checkbox" v-model="type.checked" :id="'project-' + type.id" class="mr-3 w-6 h-6" />
          <label :for="'project-' + type.id" class="text-md">{{ type.name }}</label>
        </li>
      </div>
    </div>

    <!-- Tipo Material -->
    <div class="flex flex-col justify-center gap-4 p-2">
      <h2 class="font-bold text-center text-2xl">Tipo material</h2>
      <div class="flex flex-col gap-2">
        <li v-for="material in materialTypes" :key="material.id" class="flex items-center">
          <input type="checkbox" v-model="material.checked" :id="'material-' + material.id" class="mr-3 w-6 h-6" />
          <label :for="'material-' + material.id" class="text-md">{{ material.name }}</label>
        </li>
      </div>
    </div>

    <!-- Subir Archivo -->
    <div class="flex flex-col gap-3 md:gap-10 p-2 text-center">
      <h2 class="font-bold text-center text-2xl">Archivo</h2>
      <input type="file" @change="handleFileUpload" class="p-2 border border-gray-300" />
      <!-- <p v-if="file" class="mt-2 text-sm text-gray-600">Archivo seleccionado: {{ file.name }}</p> -->
    </div>
  </div>
  <div class="flex justify-center">
    <button class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-16 my-8" type="submit">
      Enviar
    </button>
  </div>
</template>

<style scoped></style>