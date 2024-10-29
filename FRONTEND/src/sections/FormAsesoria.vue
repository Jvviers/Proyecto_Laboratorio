<script>
import { ref } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
    name: 'FormAsesoria',
    components: {
        DatePicker,
    },
    setup() {
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
                const response = await fetch('http://localhost:3000/asesoria', {
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

        const selectedColor = ref('blue');
        const timeAccuracy = ref(2);

        return {
            solicitante,
            email,
            matricula,
            actividad,
            selectedDate,
            disabledDates,
            asesoria,
            selectedColor,
            timeAccuracy,
            accessMessage,
        };
    },
};
</script>

<template>
    <div v-if="accessMessage" class="fixed top-32 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50">
        {{ accessMessage }}
    </div>
    <form @submit.prevent="asesoria" class="flex flex-col justify-center items-center gap-4 my-4 w-full">
        <h1 class="text-3xl text-center font-bold">Agendar asesoría</h1>
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
        <div class="flex flex-col items-center gap-4 p-4">
            <label class="text-2xl" for="date">Seleccione una fecha:</label>
            <DatePicker v-model="selectedDate" id="date" mode="dateTime" is-required is24hr hide-time-header
                :disabled-dates="disabledDates" :min-date="new Date()" :color="selectedColor"
                :time-accuracy="timeAccuracy" />
        </div>
        <button class="button" type="submit">
            Agendar
        </button>
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