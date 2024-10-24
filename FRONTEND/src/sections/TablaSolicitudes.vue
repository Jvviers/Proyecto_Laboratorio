<script setup>
import { ref, onMounted } from 'vue';

const requests = ref([]);
const error = ref(null);
const userId = ref(null);
const userRole = ref(false);
const validSession = ref(false);
const encargados = ref([]);

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
      userId.value = data.id;
      userRole.value = data.is_admin;
      fetchRequests();
    }
  } catch (err) {
    console.error('Error al validar sesión:', err);
  }
};

const fetchRequests = async () => {
  try {
    const route = userRole.value ? 'solicitudes' : `solicitudes/${userId.value}`;
    const response = await fetch('http://localhost:3000/' + route, {
      method: 'GET',
      credentials: 'include',
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

const getIdEncargados = async () => {
  try {
    const response = await fetch('http://localhost:3000/allIdEncargados', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Status:', response.status);
      throw new Error('Error en la respuesta del servidor: ' + response.statusText);
    }

    const data = await response.json();
    encargados.value = data;
    console.log('Encargados:', encargados.value);
    for (const encargado of encargados.value) {
      console.log('Encargado:', encargado.id);
    }
  } catch (err) {
    console.error('Error fetching solicitudes:', err);
  }
};

onMounted(() => {
  validateSession();
  getIdEncargados();
});

const sendEmail = (request) => {
  alert(`Email sent to ${request.email} regarding request ${request.id}`);
};

const goToLogin = () => {
  window.location.href = '/login';
};
</script>

<template>
  <div class="flex justify-center py-6">
    <h1 v-if="validSession" class="text-3xl text-center font-bold">Bienvenido Administrador</h1>
    <h1 v-if="!validSession" class="text-2xl text-center font-bold">Inicia sesión para ver las solicitudes</h1>
  </div>
  <!-- Contenedor de la tabla con un máximo de altura y desplazamiento vertical -->
  <div v-if="validSession" class="w-10/12 overflow-x-scroll border mx-4 mb-6">
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
          <td>
            <select v-model="request.ref_enc" class="border rounded px-2 py-1">
              <option v-for="encargado in encargados" :key="encargado.id" :value="encargado.id">{{ encargado.id }}</option>
            </select>
          </td>
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

  <div v-if="!validSession" class="w-full h-[200px] flex justify-center items-center">
    <button class="button" @click="goToLogin">Iniciar Sesión</button>
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

  select {
    outline: none;
  }
  select:focus {
    border: #00cdcd 1px solid;
  }
</style>
