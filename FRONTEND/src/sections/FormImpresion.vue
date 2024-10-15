<script>
import { ref } from "vue";

export default {
  name: "Materiales",
  setup() {
    // Variables del formulario de solicitud
    const solicitante = ref("");
    const email = ref("");
    const matricula = ref("");
    const actividad = ref("");

    // Variables de tipos de proyecto y material
    const projectTypes = ref([
      { id: 1, name: "Personal" },
      { id: 2, name: "Curso" },
      { id: 3, name: "Proyecto" },
      { id: 4, name: "IPSUM" },
      { id: 5, name: "IPSUM" },
    ]);

    const materialTypes = ref([
      { id: 1, name: "PLA" },
      { id: 2, name: "ABS" },
      { id: 3, name: "LOREM" },
      { id: 4, name: "LOREM" },
      { id: 5, name: "LOREM" },
    ]);

    const tipo_proyecto = ref(null);
    const tipo_material = ref(null);
    const archivo = ref(null);

    const handleFileUpload = (event) => {
      archivo.value = event.target.files[0];
    };

    // Función para enviar el formulario
    const postMateriales = async () => {
      try {
        // Realizar la solicitud POST al backend
        const response = await fetch("http://localhost:3000/materiales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            solicitante: solicitante.value,
            email: email.value,
            matricula: matricula.value,
            actividad: actividad.value,
            tipo_proyecto: tipo_proyecto.value,
            tipo_material: tipo_material.value,
            archivo: archivo.value,
          }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Solicitud enviada:", data);
      } catch (error) {
        console.error("Error al enviar solicitud:", error);
      }
    };

    return {
      solicitante,
      email,
      matricula,
      actividad,
      projectTypes,
      materialTypes,
      tipo_proyecto,
      tipo_material,
      archivo,
      handleFileUpload,
      postMateriales,
    };
  },
};
</script>

<template>
  <form
    @submit.prevent="postMateriales"
    class="flex flex-col justify-center items-center gap-4 my-4 w-full"> 
    <h1 class="text-3xl text-center font-bold">Solicitud Impresión</h1>
    <!-- Sección de formulario de solicitud de impresión -->
    <div class="flex flex-col justify-center items-center gap-4 mx-auto px-10 py-6">
      <div class="flex justify-between items-center w-full gap-4">
        <label for="solicitante">Solicitante:</label>
        <input class="text-input" type="text" id="solicitante" v-model="solicitante" required />
      </div>
      <div class="flex justify-between items-center w-full gap-4">
        <label for="email">Email:</label>
        <input class="text-input" type="email" id="email" v-model="email" required />
      </div>
      <div class="flex justify-between items-center w-full gap-4">
        <label for="matricula">Matrícula:</label>
        <input class="text-input" type="text" id="matricula" v-model="matricula" required />
      </div>
      <div class="flex justify-between items-center w-full gap-4">
        <label for="actividad">Actividad:</label>
        <input class="text-input" type="text" id="actividad" v-model="actividad" required />
      </div>
    </div>

    <!-- Sección de selección de materiales y proyectos -->
    <div class="flex flex-wrap justify-evenly w-full">
      <!-- Tipo Proyecto -->
      <div class="flex flex-col justify-center gap-4 p-2">
        <h2 class="font-bold text-center text-2xl">Tipo proyecto</h2>
        <ul class="flex flex-col gap-2">
          <li
            v-for="type in projectTypes"
            :key="type.id"
            class="flex items-center"
          >
            <input
              type="radio"
              v-model="tipo_proyecto"
              :id="'project-' + type.id"
              :value="type.id"
              class="mr-3 w-6 h-6"
              required
            />
            <label :for="'project-' + type.id" class="text-md">{{
              type.name
            }}</label>
          </li>
        </ul>
      </div>

      <!-- Tipo Material -->
      <div class="flex flex-col justify-center gap-4 p-2">
        <h2 class="font-bold text-center text-2xl">Tipo material</h2>
        <ul class="flex flex-col gap-2">
          <li
            v-for="material in materialTypes"
            :key="material.id"
            class="flex items-center"
          >
            <input
              type="radio"
              v-model="tipo_material"
              :id="'material-' + material.id"
              :value="material.id"
              class="mr-3 w-6 h-6"
              required
            />
            <label :for="'material-' + material.id" class="text-md">{{
              material.name
            }}</label>
          </li>
        </ul>
      </div>

      <!-- Subir archivo -->
        <div class="flex flex-col gap-3 md:gap-10 p-2 text-center">
        <h2 class="font-bold text-center text-2xl">Archivo</h2>
        <input
          type="file"
          @change="handleFileUpload"
          class="p-2 border border-gray-300"
          accept=".pdf,.doc,.docx,.jpg,.png"
        />
        <p v-if="archivo" class="mt-2 text-sm text-gray-600">
          Archivo seleccionado: {{ archivo.name }}
        </p>
      </div>
    </div>

    <!-- Botón enviar -->
    <div class="flex justify-center py-4">
      <button
        class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 text-nowrap rounded"
        type="submit"
      >
        Enviar
      </button>
    </div>
  </form>
</template>

<style scoped>
.text-input {
  width: 300px;
}
</style>
