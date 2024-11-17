<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

// Recibe la propiedad isModalOpen
const props = defineProps({
    isModalOpen: Boolean
});

// Emitir eventos
const emit = defineEmits(['close-modal']);

// Función para cerrar el modal desde dentro de Register
const closeModal = () => {
    emit('close-modal');
};

const email = ref('');
const password = ref('');
const is_admin = ref(false);

const register = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                is_admin: is_admin.value,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        /* console.log('Usuario registrado:', data); */
        closeModal();
    } catch (error) {
        console.error('Error al registrar:', error);
    }
};
</script>
<template>
    <form @submit.prevent="register" class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">
        <h2 class="text-2xl font-bold text-center text-utal">AGREGAR ENCARGADO</h2>
        <div class="flex flex-col justify-center items-center w-full gap-4">
            <div class="flex flex-col justify-start items-start w-full gap-1">
                <label for="email">Email:</label>
                <input class="input w-full" type="email" id="email" v-model="email" 
                placeholder="Correo del encargado" required />
            </div>
            <div class="flex flex-col justify-start items-start w-full gap-1">
                <label for="password">Contraseña:</label>
                <input class="input w-full" type="password" id="password" v-model="password" 
                placeholder="Contraseña del encargado" required />
            </div>
            <!-- <div class="flex flex-col justify-start items-center w-full gap-8">
                <label for="is_admin">Es Admin:</label>
                <input class="input" type="checkbox" id="is_admin" v-model="is_admin" />
            </div> -->
        </div>
        <div class="flex w-full justify-center items-center gap-8 mt-4">
            <button class="button-red" type="submit">AGREGAR</button>
            <button class="button" type="button" @click="closeModal">CANCELAR</button>
        </div>
    </form>
</template>