<script setup>
import { ref } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
    errorMessage.value = '';
    try {
        const response = await fetch(BACKEND_URL + '/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            errorMessage.value = data.message;
            showErrorBanner();
            return;
        }

        const data = await response.json();
        console.log('Usuario logeado:', data);
        goToAdmin();
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        errorMessage.value = 'Hubo un problema al iniciar sesión. Intente nuevamente.';
        showErrorBanner();
    }
};

const showErrorBanner = () => {
    setTimeout(() => {
        errorMessage.value = '';
    }, 4000);
};

const goToAdmin = () => {
    window.location.href = '/admin';
};
</script>

<template>
    <section>
        <span v-if="errorMessage"
            class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded shadow-lg z-50">
            {{ errorMessage }}
        </span>
        <form @submit.prevent="login" class="flex flex-col justify-center items-center gap-4 py-12 w-full">
            <header class="flex flex-col justify-center gap-2">
                <h2 class="text-2xl text-center font-bold text-utal">INICIAR SESIÓN</h2>
                <h3 class="text-lg text-center">Aquí los administradores y encargados de laboratorio pueden iniciar sesión</h3>
            </header>
            <div class="flex flex-col justify-center items-center gap-4 mx-auto px-10 py-6">
                <div class="flex justify-between items-center w-full gap-4">
                    <label for="email">Email:</label>
                    <input class="text-input input" type="email" id="email" v-model="email" required />
                </div>
                <div class="flex justify-between items-center w-full gap-4">
                    <label for="password">Contraseña:</label>
                    <input class="text-input input" type="password" id="password" v-model="password" required />
                </div>
            </div>
            <button class="button" type="submit">INICIAR SESIÓN</button>
        </form>
    </section>
</template>