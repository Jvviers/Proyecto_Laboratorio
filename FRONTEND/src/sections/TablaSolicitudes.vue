<script setup>
import { ref, onMounted } from 'vue';

const requests = ref([]);
const error = ref(null);

const fetchRequests = async () => {
  try {
    const response = await fetch('http://localhost:3000/solicitudes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Status:', response.status);
      throw new Error('Error en la respuesta del servidor: ' + response.statusText);
    }

    const data = await response.json();
    requests.value = data;
  } catch (err) {
    error.value = err.message;
    console.error('Error fetching solicitudes:', err);
  }
};

onMounted(() => {
  fetchRequests();
});

const sendEmail = (request) => {
  alert(`Email sent to ${request.email} regarding request ${request.id}`);
};
</script>

<template>
  <!-- Contenedor de la tabla con un máximo de altura y desplazamiento vertical -->
  <div class="w-10/12 overflow-x-scroll border mx-4">
    <table class="table-auto bg-white">
      <thead class="bg-gray-100 sticky top-0">
        <tr>
          <th>ID</th>
          <th>Encargado</th>
          <th>Solicitante</th>
          <th>Email</th>
          <th>Matricula</th>
          <th>Actividad</th>
          <th>Fecha</th>
          <th>Tipo Proyecto</th>
          <th>Tipo Material</th>
          <th>Archivo</th>
          <th>Tipo Solicitud</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- Iterar sobre los datos de requests -->
        <tr v-for="request in requests" :key="request.id">
          <td class="td">{{ request.id }}</td>
          <td class="td">{{ request.ref_enc }}</td>
          <td class="td">{{ request.solicitante }}</td>
          <td class="td">{{ request.email }}</td>
          <td class="td">{{ request.matricula }}</td>
          <td class="td text-wrap overflow-x-scroll max-w-[180px]">{{ request.actividad }}</td>
          <td class="td">{{ request.fecha }}</td>
          <td class="td">{{ request.tipo_proyecto }}</td>
          <td class="td">{{ request.tipo_material }}</td>
          <td class="td">{{ request.archivo }}</td>
          <td class="td">{{ request.tipo_form }}</td>
          
          <!-- Selector que muestra y actualiza el estado -->
          <td>
            <select v-model="request.estado" class="border rounded px-2 py-1">
              <option value="en espera">En espera</option>
              <option value="agendado">Agendado</option>
              <option value="cola_impresion">Cola de Impresión</option>
              <option value="listo_retirar">Listo para Retirar</option>
              <option value="rechazado">Rechazado</option>
              <option value="terminado">Terminado</option>
            </select>
          </td>
          
          <td class="px-4 py-2 text-sm whitespace-nowrap">
            <button class="button" @click="sendEmail(request)" type="button">
              Enviar Email
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Mostrar errores si hay -->
  <div v-if="error" class="text-red-500">
    Error: {{ error }}
  </div>
</template>

<style scoped>
  th {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: left;
    font-size: 12px;
    line-height: 1rem;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .td {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
  }
</style>
