<script setup>
import { ref, onMounted } from 'vue';
import Encargados from "../components/Encargados.vue";
import Maquinarias from "../components/Maquinarias.vue"
import Laboratorios from "../components/Laboratorios.vue"
import Materiales from "../components/Materiales.vue"

const userRole = ref(false);
const validSession = ref(false);

const validateSession = async () => {
  try {
    const response = await fetch('http://localhost:3000/session', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Status:', response.status);
    } else {
      const data = await response.json();
      validSession.value = true;
      userRole.value = data.is_admin;
      console.log('userRole:', userRole.value);
    }
  } catch (err) {
    console.error('Error al validar sesión:', err);
  }
};

onMounted(() => {
  validateSession();
});
</script>
<template>
    <div v-if="validSession && userRole" class="flex flex-wrap justify-evenly items-center gap-8 py-8">
        <Encargados />
        <Maquinarias />
        <Laboratorios />
        <Materiales />
    </div>
</template>