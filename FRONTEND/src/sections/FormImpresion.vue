<script>
import { ref } from 'vue';

export default {
    name: 'FormImpresion',
    setup() {
        // Variables del formulario
        const solicitante = ref("");
        const matricula = ref("");
        const actividad = ref("");

        return {
            solicitante,
            matricula,
            actividad,
        };
    },
};
</script>

<template>
    <form class="flex flex-col justify-center items-center gap-4 my-4 w-full">
        <h1 class="text-3xl text-center font-bold">Solicitud Impresión</h1>
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
    </form>
</template>

<style scoped>
.text-input {
    width: 300px;
}
</style>