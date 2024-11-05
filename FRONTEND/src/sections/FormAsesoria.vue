<script setup>
import { ref } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

// Variables del formulario
const solicitante = ref("");
const email = ref("");
const matricula = ref("");
const actividad = ref("");
const selectedDate = ref(new Date());
const accessMessage = ref("");

const disabledDates = ref([
    {
        repeat: {
            weekdays: [1, 7],
        },
    },
]);

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

const showAccessBanner = () => {
    accessMessage.value = "Solicitud enviada exitosamente!";
    setTimeout(() => {
        accessMessage.value = "";
    }, 4000);
};

const resetInputs = () => {
    solicitante.value = "";
    email.value = "";
    matricula.value = "";
    actividad.value = "";
};

const asesoria = async () => {
    try {
        const formattedDate = formatDate(selectedDate.value);
        const response = await fetch(BACKEND_URL + '/asesoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                solicitante: solicitante.value,
                email: email.value,
                matricula: matricula.value,
                actividad: actividad.value,
                fecha: formattedDate,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Solicitud enviada:', data);
        showAccessBanner();
        resetInputs();
    } catch (error) {
        console.error('Error al enviar solicitud:', error);
    }
};

const selectedColor = ref('red');
const timeAccuracy = ref(2);
</script>

<template>
    <div v-if="accessMessage" class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50">
    {{ accessMessage }}
    </div>
    <form @submit.prevent="asesoria" class="flex flex-col justify-center items-center gap-4 py-12 px-8 md:px-32 w-full">
        <header class="flex flex-col justify-center gap-3 w-full">
            <h2 class="text-2xl font-bold text-center text-utal">AGENDAR ASESORÍA</h2>
            <h3 class="text-lg text-center">Aquí puedes solicitar asesoría para tu laboratorio</h3>
        </header>
        <div class="flex flex-col lg:flex-row justify-center items-start gap-2 w-full border border-gray-300 rounded-lg shadow-md">
            <div class="flex flex-col justify-start w-3/4 lg:w-1/2 items-center gap-4 mx-auto px-8 py-6">
                <div class="flex flex-col justify-start items-start w-full gap-1">
                    <label for="solicitante">Solicitante:</label>
                    <input class="input w-full" type="text" id="solicitante" v-model="solicitante"
                        placeholder="Nombre del solicitante" required />
                </div>
                <div class="flex flex-col justify-start items-start w-full gap-1">
                    <label for="email">Email:</label>
                    <input class="input w-full" type="email" id="email" v-model="email"
                        placeholder="Correo del solicitante" required />
                </div>
                <div class="flex flex-col justify-start items-start w-full gap-1">
                    <label for="matricula">Matrícula:</label>
                    <input class="input w-full" type="text" id="matricula" v-model="matricula"
                        placeholder="Matrícula del solicitante" required />
                </div>
                <div class="flex flex-col justify-start items-start w-full gap-1">
                    <label for="actividad">Actividad:</label>
                    <input class="input w-full" type="text" id="actividad" v-model="actividad"
                        placeholder="Actividad a realizar" required />
                </div>
            </div>
            <div class="flex flex-col justify-start w-3/4 lg:w-1/2 items-center gap-4 mx-auto px-8 py-6"">
                <header class="flex flex-col justify-center gap-3 w-full">
					<h3 class="text-base text-center">Seleccione una fecha:</h3>
				</header>
                <DatePicker v-model="selectedDate" id="date" mode="dateTime" is-required is24hr hide-time-header
                    :disabled-dates="disabledDates" :min-date="new Date()" :color="selectedColor"
                    :time-accuracy="timeAccuracy" />
            </div>
        </div>
        <button class="button-red" type="submit">AGENDAR</button>
    </form>
</template>