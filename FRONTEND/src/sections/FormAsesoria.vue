<script>
import { ref } from 'vue';

export default {
    name: 'FormAsesoria',
    setup() {
        // Variables del formulario
        const solicitante = ref("");
        const matricula = ref("");
        const actividad = ref("");
        const selectedDate = ref("");

        return {
            selectedDate,
            solicitante,
            matricula,
            actividad,
        };
    },
};
</script>

<template>
    <form class="flex flex-col justify-center items-center gap-4 my-4 w-full">
        <h1 class="text-3xl text-center font-bold">Agendar asesoría</h1>
        <div class="flex flex-col justify-center items-center gap-4 mx-auto px-10 py-6">
            <div class="flex justify-between items-center w-full gap-4">
                <label for="solicitante">Solicitante:</label>
                <input class="text-input" type="text" id="solicitante" v-model="solicitante" />
            </div>
            <div class="flex justify-between items-center w-full gap-4">
                <label for="matricula">Matrícula:</label>
                <input class="text-input" type="text" id="matricula" v-model="matricula" />
            </div>
            <div class="flex justify-between items-center w-full gap-4">
                <label for="actividad">Actividad:</label>
                <input class="text-input" type="text" id="actividad" v-model="actividad" />
            </div>
        </div>
        <div class="flex flex-col items-center gap-4 p-4">
            <label class="text-2xl" for="date">Seleccione una fecha:</label>
            <input class="cursor-pointer px-4 py-2" v-model="selectedDate" type="date" id="date" />
        </div>
        <button class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4" type="submit">
            Agendar
        </button>
    </form>
</template>

<style scoped>
.text-input {
    width: 300px;
}
</style>