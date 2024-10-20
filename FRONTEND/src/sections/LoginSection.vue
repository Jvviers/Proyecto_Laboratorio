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
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Usuario logeado:', data);
                // agregar la cookie
                /* document.cookie = `accessToken=${data.accessToken}`; */

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
        <button class="button" type="submit">Iniciar Sesión</button>
    </form>
</template>