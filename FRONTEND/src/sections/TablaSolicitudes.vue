<script>
export default {
    data() {
        return {
            requests: [
                { id: 1, solicitante: 'Juan Perez', email: 'juan@example.com', requerimiento: 'Análisis de muestras', laboratorio: 'Química', estado: 'en_espera' },
                { id: 2, solicitante: 'Maria Garcia', email: 'maria@example.com', requerimiento: 'Calibración de equipos', laboratorio: 'Física', estado: 'agendado' },
                { id: 3, solicitante: 'Carlos Rodriguez', email: 'carlos@example.com', requerimiento: 'Pruebas de resistencia', laboratorio: 'Materiales', estado: 'terminado' },
            ]
        }
    },
    methods: {
        sendEmail(request) {
            // Simulating email sending
            alert(`Email sent to ${request.email} regarding request ${request.id}`);
        }
    }
}
</script>

<template>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Solicitante</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requerimiento</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Laboratorio</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción
                    </th>
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
                        <button @click="sendEmail(request)"
                            class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 text-nowrap rounded">
                            Enviar Email
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>