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
  <div class="flex flex-wrap ">
    <!-- Tipo Proyecto -->
    <div class="mb-4">
      <h2 class="font-bold text-2xl mb-10">Tipo proyecto</h2>
      <div v-for="type in projectTypes" :key="type.id" class="flex items-center">
        <input 
          type="checkbox" 
          v-model="type.checked" 
          :id="'project-' + type.id" 
          class="mr-2 w-6 h-6"
        />
        <label :for="'project-' + type.id" class="text-lg">{{ type.name }}</label>
      </div>
    </div>

    <!-- Tipo Material -->
    <div class="mb-4 mx-40 ">
      <h2 class="font-bold text-2xl mb-10">Tipo material</h2>
      <div v-for="material in materialTypes" :key="material.id" class="flex items-center">
        <input 
          type="checkbox" 
          v-model="material.checked" 
          :id="'material-' + material.id" 
          class="mr-2 w-6 h-6"
        />
        <label :for="'material-' + material.id" class="text-lg">{{ material.name }}</label>
      </div>
        <button class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-16 my-24" type="submit">
            Enviar
        </button>
    </div>

    <!-- Subir Archivo -->
    <div class="mb-4 text-center">
      <h2 class="font-bold text-2xl mb-16">Archivo</h2>
      <input 
        type="file" 
        @change="handleFileUpload" 
        class="p-2 border border-gray-300"
      />
      <p v-if="file" class="mt-2 text-sm text-gray-600">Archivo seleccionado: {{ file.name }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
