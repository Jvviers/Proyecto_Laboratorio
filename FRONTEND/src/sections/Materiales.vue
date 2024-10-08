<script>
import { ref } from 'vue';

export default {
  name: 'Materiales',
  setup() {
    const projectTypes = ref([
      { id: 1, name: 'Personal' },
      { id: 2, name: 'Curso' },
      { id: 3, name: 'Proyecto' },
      { id: 4, name: 'IPSUM' },
      { id: 5, name: 'IPSUM' },
    ]);

    const materialTypes = ref([
      { id: 1, name: 'PLA' },
      { id: 2, name: 'ABS' },
      { id: 3, name: 'LOREM' },
      { id: 4, name: 'LOREM' },
      { id: 5, name: 'LOREM' },
    ]);

    const selectedProjectType = ref(null);
    const selectedMaterialType = ref(null);
    const file = ref(null);

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };

    const enviarFormulario = () => {
      // aqui es donde se simula el envío de la información
      const formData = {
        projectType: selectedProjectType.value,
        materialType: selectedMaterialType.value,
        file: file.value ? file.value.name : "No se ha subido ningún archivo",
      };

      // Esto se puede cambiar por una petición HTTP más adelante
      console.log('Enviando los siguientes datos:', formData);
      alert('Formulario enviado correctamente con los siguientes datos: \n' + JSON.stringify(formData, null, 2));
    };

    return {
      projectTypes,
      materialTypes,
      selectedProjectType,
      selectedMaterialType,
      file,
      handleFileUpload,
      enviarFormulario,
    };
  },
};
</script>

<template>
  <div class="flex flex-wrap justify-evenly w-full">
    <!-- Tipo Proyecto -->
    <div class="flex flex-col justify-center gap-4 p-2">
      <h2 class="font-bold text-center text-2xl">Tipo proyecto</h2>
      <div class="flex flex-col gap-2">
        <li v-for="type in projectTypes" :key="type.id" class="flex items-center">
          <input 
            type="radio" 
            v-model="selectedProjectType" 
            :id="'project-' + type.id" 
            :value="type.id" 
            class="mr-3 w-6 h-6" 
          />
          <label :for="'project-' + type.id" class="text-md">{{ type.name }}</label>
        </li>
      </div>
    </div>

    <!-- Tipo Material -->
    <div class="flex flex-col justify-center gap-4 p-2">
      <h2 class="font-bold text-center text-2xl">Tipo material</h2>
      <div class="flex flex-col gap-2">
        <li v-for="material in materialTypes" :key="material.id" class="flex items-center">
          <input 
            type="radio" 
            v-model="selectedMaterialType" 
            :id="'material-' + material.id" 
            :value="material.id" 
            class="mr-3 w-6 h-6" 
          />
          <label :for="'material-' + material.id" class="text-md">{{ material.name }}</label>
        </li>
      </div>
    </div>

    <!-- la sección de subir Archivo -->
    <div class="flex flex-col gap-3 md:gap-10 p-2 text-center">
      <h2 class="font-bold text-center text-2xl">Archivo</h2>
      <input type="file" @change="handleFileUpload" class="p-2 border border-gray-300" />
      <!-- <p v-if="file" class="mt-2 text-sm text-gray-600">Archivo seleccionado: {{ file.name }}</p> -->

      <!-- Si no estuviera comentada, esta línea de código haría lo siguiente:
      Cuando se selecciona un archivo en el input de tipo "file", 
      se mostraría un mensaje que diría: "Archivo seleccionado: [nombre_del_archivo]". 
      que no lo veo muy necesario ya que de por sí ya se muestra, pero no estaría demás si quisieramos cambiar esto-->
    </div>
  </div>

  <!-- Lo que hace el boton para enviar -->
  <div class="flex justify-center py-4">
    <button class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 text-nowrap rounded"
      type="submit" @click="enviarFormulario">
      Enviar
    </button>
  </div>
</template>

<style scoped></style>
