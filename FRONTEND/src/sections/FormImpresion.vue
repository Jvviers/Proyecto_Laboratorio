<script>
import { ref } from "vue";
import * as UC from '@uploadcare/file-uploader';
import "@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css"

export default {
  name: "Materiales",
  setup() {
    // Variables del formulario de solicitud
    const solicitante = ref("");
    const email = ref("");
    const matricula = ref("");
    const actividad = ref("");

    UC.defineComponents(UC);
    const uploadedFiles = ref([]);
    const PUBLIC_UPLOADCARE_KEY = import.meta.env.PUBLIC_UPLOADCARE_KEY

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

    const handleFileUpload = (fileInfo) => {
      archivo.value = fileInfo.cdnUrl; // Guardamos la URL del archivo subido
      console.log("Archivo subido:", archivo.value); // Debug para ver la URL
    };

    const handleChangeEvent = (e) => {
      if (e.detail) {
        uploadedFiles.value = e.detail.allEntries.filter(
          (f) => f.status === "success"
        );
      }
      console.log(uploadedFiles.value);
    };


    // Función para enviar el formulario
    const postMateriales = async () => {
      try {
        console.log(solicitante.value);
        console.log(email.value);
        console.log(matricula.value);
        console.log(actividad.value);
        console.log(tipo_proyecto.value);
        console.log(tipo_material.value);
        console.log(archivo.value);
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
      uploadedFiles,
      handleChangeEvent,
      PUBLIC_UPLOADCARE_KEY,
      /* handleModalCloseEvent, */
    };
  },
};
</script>

<template>
  <form @submit.prevent="postMateriales" class="flex flex-col justify-center items-center gap-4 my-4 w-full px-4 md:px-0">
    <h1 class="text-3xl text-center font-bold">Solicitud Impresión</h1>
    <!-- Sección de formulario de solicitud de impresión -->
    <div class="flex flex-col justify-center items-center gap-4 mx-auto px-10 py-6">
      <div class="flex justify-between items-center w-full gap-4">
        <label for="solicitante">Solicitante:</label>
        <input class="text-input input" type="text" id="solicitante" v-model="solicitante" required />
      </div>
      <div class="flex justify-between items-center w-full gap-4">
        <label for="email">Email:</label>
        <input class="text-input input" type="email" id="email" v-model="email" required />
      </div>
      <div class="flex justify-between items-center w-full gap-4">
        <label for="matricula">Matrícula:</label>
        <input class="text-input input" type="text" id="matricula" v-model="matricula" required />
      </div>
      <div class="flex justify-between items-center w-full gap-4">
        <label for="actividad">Actividad:</label>
        <input class="text-input input" type="text" id="actividad" v-model="actividad" required />
      </div>
    </div>

    <!-- Sección de selección de materiales y proyectos -->
    <div class="flex flex-wrap gap-8 px-4 justify-evenly w-full">
      <!-- Tipo Proyecto -->
      <div class="flex flex-col justify-center gap-4 p-2">
        <h2 class="font-bold text-center text-2xl">Tipo proyecto</h2>
        <ul class="flex flex-col gap-2">
          <li v-for="type in projectTypes" :key="type.id" class="flex items-center">
            <input type="radio" v-model="tipo_proyecto" :id="'project-' + type.id" :value="type.name" class="mr-3 w-6 h-6"
              required />
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
          <li v-for="material in materialTypes" :key="material.id" class="flex items-center">
            <input type="radio" v-model="tipo_material" :id="'material-' + material.id" :value="material.name"
              class="mr-3 w-6 h-6" required />
            <label :for="'material-' + material.id" class="text-md">{{
              material.name
            }}</label>
          </li>
        </ul>
      </div>

      <!-- Subir archivo -->
      <!-- <div class="flex flex-col gap-3 md:gap-10 p-2 text-center">
        <h2 class="font-bold text-center text-2xl">Archivo</h2>
        <input type="file" @change="handleFileUpload" class="p-2 border border-gray-300"
          accept=".pdf,.doc,.docx,.jpg,.png" />
        <p v-if="archivo" class="mt-2 text-sm text-gray-600">
          Archivo seleccionado: {{ archivo.name }}
        </p>
      </div> -->

      <div class="flex justify-center items-center">
        <uc-config ctx-name="my-uploader" use-cloud-image-editor="false" source-list="local, url, gdrive"
          :pubkey=PUBLIC_UPLOADCARE_KEY></uc-config>

        <uc-file-uploader-regular ctx-name="my-uploader" class="uc-light"></uc-file-uploader-regular>

        <uc-upload-ctx-provider ref="ctxProviderRef" ctx-name="my-uploader" @change="handleChangeEvent"></uc-upload-ctx-provider>
      </div>
    </div>

    <!-- Botón enviar -->
    <div class="flex justify-center py-4">
      <button class="button" type="submit">
        Enviar
      </button>
    </div>
  </form>
</template>

<style scoped>
.text-input {
  width: 240px;
  @media (min-width: 768px) {
    width: 300px;
  }
}
</style>