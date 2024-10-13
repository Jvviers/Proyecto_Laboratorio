<script>
import { ref } from 'vue';

export default {
    setup() {
        const email = ref('');
        const password = ref('');

        const login = async () => {
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value,
                    }),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Usuario logeado:', data);
            } catch (error) {
                console.error('Error al iniciar sesion:', error);
            }
        };

        return {
            email,
            password,
            login,
        };
    },
};
</script>
<template>
    <form @submit.prevent="login" class="flex flex-col justify-center items-center gap-4 my-4 w-full">
        <h1 class="text-3xl text-center font-bold">Login</h1>
        <div class="flex flex-col justify-center items-center gap-4 mx-auto px-10 py-6">
            <div class="flex justify-between items-center w-full gap-4">
                <label for="email">Email:</label>
                <input class="text-input" type="email" id="email" v-model="email" required />
            </div>
            <div class="flex justify-between items-center w-full gap-4">
                <label for="password">Contraseña:</label>
                <input class="text-input" type="password" id="password" v-model="password" required />
            </div>
        </div>
        <button type="submit" class="px-4 py-2 bg-gray-500 text-white rounded">Login</button>
    </form>
</template>