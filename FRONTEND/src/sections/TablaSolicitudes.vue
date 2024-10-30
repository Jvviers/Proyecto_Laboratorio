<script setup>
import { ref, onMounted, computed } from 'vue';

const requests = ref([]);
const error = ref(null);
const userId = ref(null);
const userRole = ref(false);
const validSession = ref(false);
const encargados = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

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

const getEncargados = async () => {
  try {
    const response = await fetch('http://localhost:3000/encargados', {
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

const sendEmail = (request) => {
  alert(`Email sent to ${request.email} regarding request ${request.id}`);
};

const goToLogin = () => {
  window.location.href = '/login';
};

const updateEncargado = async (sol_id, ref_enc) => {
  try {
    const response = await fetch('http://localhost:3000/encargado-solicitud', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref_enc: ref_enc,
        id: sol_id,
      }),
    });
    if (!response.ok) {
      console.error('Status:', response.status);
      throw new Error('Error en la respuesta del servidor: ' + response.statusText);
    }
    const data = await response.json();
    console.log('Datos:', data);
  } catch (err) {
    console.error('Error fetching solicitudes:', err);
  }
};

const updateState = async (sol_id, state) => {
  try {
    const response = await fetch('http://localhost:3000/estado-solicitud', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        estado: state,
        id: sol_id,
      }),
    });
    if (!response.ok) {
      console.error('Status:', response.status);
      throw new Error('Error en la respuesta del servidor: ' + response.statusText);
    }
    const data = await response.json();
    console.log('Datos:', data);
  } catch (err) {
    console.error('Error fetching solicitudes:', err);
  }
};

const eliminarSolicitud = async (id) => {
  try {
    const response = await fetch('http://localhost:3000/solicitud', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
      credentials: 'include',
    });
    if (!response.ok) {
      console.error('Status:', response.status);
      throw new Error('Error en la respuesta del servidor: ' + response.statusText);
    }
    const data = await response.json();
    console.log('Datos:', data);
    fetchRequests();
  } catch (err) {
    console.error('Error al eliminar solicitud:', err);
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return requests.value.slice(start, end);
});

onMounted(() => {
  validateSession();
  getEncargados();
});
</script>

<template>
  <div class="flex justify-center py-6 px-8">
    <div v-if="validSession" class="flex flex-col justify-center items-center gap-6">
      <h1 class="text-3xl text-center font-bold">Bienvenido Administrador</h1>
      <h2 class="text-2xl text-center font-bold">Tabla de Solicitudes</h2>
    </div>
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
        <tr v-for="request in paginatedRequests" :key="request.id">
          <td class="td">{{ request.id }}</td>
          <td>
            <select v-if="request.tipo_form != 'asesoria'" v-model="request.ref_enc"
              @change="updateEncargado(request.id, request.ref_enc)" class="border rounded px-2 py-1">
              <option v-for="encargado in encargados" :key="encargado.id" :value="encargado.id">{{ encargado.email }}
              </option>
            </select>
          </td>
          <td class="td">{{ request.solicitante }}</td>
          <td class="td">{{ request.email }}</td>
          <td class="td">{{ request.matricula }}</td>
          <td class="td text-wrap overflow-x-scroll max-w-[180px]">{{ request.actividad }}</td>
          <td class="td">
            <p v-if="request.fecha">{{ formatDate(request.fecha) }}</p>
          </td>
          <td class="td">{{ request.tipo_proyecto }}</td>
          <td class="td">{{ request.tipo_material }}</td>
          <td class="td text-wrap overflow-x-scroll max-w-[180px]"><a target="_blank" :href="request.archivo"
              class="text-blue-500 underline">{{ request.archivo }}</a></td>
          <td class="td capitalize">{{ request.tipo_form }}</td>

          <!-- Selector que muestra y actualiza el estado -->
          <td>
            <select v-if="request.tipo_form == 'asesoria'" v-model="request.estado"
              @change="updateState(request.id, request.estado)" class="border rounded px-2 py-1 w-[170px]">
              <option value="en espera">En espera</option>
              <option value="agendado">Agendado</option>
              <option value="terminado">Terminado</option>
            </select>
            <select v-if="request.tipo_form == 'impresion'" v-model="request.estado"
              @change="updateState(request.id, request.estado)" class="border rounded px-2 py-1 w-[170px]">
              <option value="en espera">En espera</option>
              <option value="cola_impresion">Cola de Impresión</option>
              <option value="listo_retirar">Listo para Retirar</option>
              <option value="rechazado">Rechazado</option>
              <option value="terminado">Terminado</option>
            </select>
            <select v-if="request.tipo_form == 'laboratorio'" v-model="request.estado"
              @change="updateState(request.id, request.estado)" class="border rounded px-2 py-1 w-[170px]">
              <option value="en espera">En espera</option>
              <option value="agendado">Agendado</option>
              <option value="rechazado">Rechazado</option>
              <option value="terminado">Terminado</option>
            </select>
          </td>

          <td class="flex justify-center items-center py-4">
            <button @click="eliminarSolicitud(request.id)" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                <path
                  d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="validSession" class="pagination-controls">
    <button @click="currentPage > 1 && currentPage--" :disabled="currentPage <= 1">
      <img src="/icons/arrow.svg" alt="Flecha Izquierda Tabla" class="w-4 h-4 rotate-180" />
    </button>
    <span>Página {{ currentPage }}</span>
    <button @click="currentPage++" :disabled="currentPage >= Math.ceil(requests.length / itemsPerPage)">
      <img src="/icons/arrow.svg" alt="Flecha Derecha Tabla" class="w-4 h-4" />
    </button>
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

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.pagination-controls button {
  padding: 8px 8px;
  background-color: #e5e7eb;
  /* Color de fondo del botón */
  color: #242424;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-controls button:hover {
  background-color: #00cdcd;
  /* Color al pasar el mouse */
}

.pagination-controls button:disabled {
  background-color: #c0c0c0;
  /* Color de fondo cuando está deshabilitado */
  cursor: not-allowed;
  opacity: 0.7;
}

.pagination-controls span {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

svg path {
    fill: #6b7280;
    transition: all 0.3s ease;
}

button:hover svg path {
    fill: #ef4444;
    transition: all 0.3s ease;
}
</style>