<script>
export default {
  data() {
    return {
      requests: [],
      error: null
    };
  },
  mounted() { 
    fetch('http://localhost:3000/solicitudes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },  
    })
    .then(response => {
      if (!response.ok) {
        console.error('Status:', response.status);
        throw new Error('Error en la respuesta del servidor:' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      this.requests = data;
    })
    .catch(error => {
      this.error = error.message;
      console.error('Error fetching solicitudes:', error);
    });
  },
  methods: {
    sendEmail(request) {
      // Simulación del envío de email para el futuro...
      alert(`Email sent to ${request.email} regarding request ${request.id}`);
    }
  }
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solicitante</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requerimiento</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laboratorio</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="request in requests" :key="request.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ request.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ request.solicitante }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ request.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ request.requerimiento }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ request.laboratorio }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <select v-model="request.estado" class="border rounded px-2 py-1">
              <option value="en_espera">En espera</option>
              <option value="agendado">Agendado</option>
              <option value="cola_impresion">Cola de Impresión</option>
              <option value="listo_retirar">Listo para Retirar</option>
              <option value="rechazado">Rechazado</option>
              <option value="terminado">Terminado</option>
            </select>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button class="button" @click="sendEmail(request)" type="button">
              Enviar Email
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Mostrar errores si hay -->
    <div v-if="error" class="text-red-500">
      Error: {{ error }}
    </div>
  </div>
</template>
