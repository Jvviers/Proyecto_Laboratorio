<script>
import { ref } from 'vue';

export default {
    name: 'FormLaboratorios',
    setup() {
        // Variables del formulario
        const solicitante = ref("");
        const email = ref("");
        const matricula = ref("");
        const actividad = ref("");

        const equiposTypes = ref([
            { id: 1, name: 'Impresora Creality FDM', checked: false },
            { id: 2, name: 'Impresoras Creality Resina', checked: false },
            { id: 3, name: 'Impresoras Stratasys', checked: false },
            { id: 4, name: 'Extrusora', checked: false },
            { id: 5, name: 'Inyectora', checked: false },
            { id: 6, name: 'Scanner', checked: false },
        ]);

        let equiposSeleccionados = ref([]);
        const idSolicitud = ref();

        const postEquipos = async () => {
            try {
                const response = await fetch('http://localhost:3000/equipos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        solicitante: solicitante.value,
                        email: email.value,
                        matricula: matricula.value,
                        actividad: actividad.value,
                    }),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Solicitud enviada:', data);
                idSolicitud.value = data.insertId;
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }

            equiposToArray();
            for (const equipo of equiposSeleccionados) {
                console.log('Equipo:', equipo);
                console.log('idSolicitud:', idSolicitud.value);
                try {
                    const response = await fetch('http://localhost:3000/equipo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ref_sol: idSolicitud.value,
                            nombre_equipo: equipo,
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    const data = await response.json();
                    console.log('Equipo agregado:', data);
                } catch (error) {
                    console.error('Error al enviar la solicitud:', error);
                }
            }
        };

        const equiposToArray = () => {
            equiposSeleccionados = equiposTypes.value
                .filter(equipo => equipo.checked)
                .map(equipo => equipo.name); // Filtrar los equipos seleccionados
            console.log('Equipos seleccionados:', equiposSeleccionados); //PROBANDO SI REALMENTE LOS EQUIPOS SELECCIONADOS SE GUARDAN
        };

        return {
            solicitante,
            email,
            matricula,
            actividad,
            equiposTypes,  
            postEquipos,  
        };
    },
};
</script>

<template>
    <form @submit.prevent="postEquipos" class="flex flex-col justify-center items-center gap-4 my-4 w-full">
        <h1 class="text-3xl text-center font-bold">Equipos</h1>
        <div class="flex flex-col justify-center items-center gap-4 mx-auto px-10 py-6">
            <div class="flex justify-between items-center w-full gap-4">
                <label for="solicitante">Solicitante:</label>
                <input class="text-input input" type="text" id="solicitante" v-model="solicitante" />
            </div>
            <div class="flex justify-between items-center w-full gap-4">
                <label for="email">Email:</label>
                <input class="text-input input" type="email" id="email" v-model="email" />
            </div>
            <div class="flex justify-between items-center w-full gap-4">
                <label for="matricula">Matrícula:</label>
                <input class="text-input input" type="text" id="matricula" v-model="matricula" />
            </div>
            <div class="flex justify-between items-center w-full gap-4">
                <label for="actividad">Actividad:</label>
                <input class="text-input input" type="text" id="actividad" v-model="actividad" />
            </div>
        </div>
        <div class="flex flex-col justify-center gap-4 p-2">
            <h2 class="font-bold text-center text-2xl">Equipos a utilizar</h2>
            <div class="flex flex-col gap-2">
                <li v-for="equipo in equiposTypes" :key="equipo.id" class="flex items-center"> <!-- equipo in equiposTypes (error?) -->
                    <input type="checkbox" v-model="equipo.checked" :id="'equipo-' + equipo.id" class="mr-3 w-6 h-6" />
                    <label :for="'equipo-' + equipo.id" class="text-md">{{ equipo.name }}</label>
                </li>
            </div>
        </div>
        <button class="button" type="submit">
            Enviar
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
