<script>
import { ref } from 'vue';

export default {
    name: 'FormLaboratorio',
    setup() {
        // Variables del formulario
        const solicitante = ref("");
        const matricula = ref("");
        const actividad = ref("");

        const equipos = [
            { id: 1, name: 'Impresora Creality FDM', checked: false },
            { id: 2, name: 'Impresoras Creality Resina', checked: false },
            { id: 3, name: 'Impresoras Stratasys', checked: false },
            { id: 4, name: 'Extrusora', checked: false },
            { id: 5, name: 'Inyectora', checked: false },
            { id: 6, name: 'Scanner', checked: false },
        ]

        return {
            solicitante,
            matricula,
            actividad,
            equipos,
        };
    },
};
</script>

<template>
    <form class="flex flex-col justify-center items-center gap-4 my-4 w-full">
        <h1 class="text-3xl text-center font-bold">Equipos</h1>
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
        <div class="flex flex-col justify-center gap-4 p-2">
            <h2 class="font-bold text-center text-2xl">Equipos a utilizar</h2>
            <div class="flex flex-col gap-2">
                <li v-for="equipo in equipos" :key="equipo.id" class="flex items-center">
                    <input type="checkbox" v-model="equipo.checked" :id="'equipo-' + equipo.id" class="mr-3 w-6 h-6" />
                    <label :for="'equipo-' + equipo.id" class="text-md">{{ equipo.name }}</label>
                </li>
            </div>
        </div>
        <button class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4" type="submit">
            Enviar
        </button>
    </form>
</template>

<style scoped>
.text-input {
    width: 300px;
}
</style>