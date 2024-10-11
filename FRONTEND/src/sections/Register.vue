<script>
import { ref } from 'vue';

export default {
    setup() {
        const email = ref('');
        const password = ref('');
        const is_admin = ref(false);

        const register = async () => {
            try {
                const response = await fetch('http://localhost:3000/register', {
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
                console.log('Usuario registrado:', data);
            } catch (error) {
                console.error('Error al registrar:', error);
            }
        };

        return {
            email,
            password,
            is_admin,
            register,
        };
    },
};
</script>
<template>
    <form @submit.prevent="register" class="flex flex-col justify-center items-center gap-4 my-4 w-full">
        <h1 class="text-3xl text-center font-bold">Registro</h1>
        <div class="flex flex-col justify-center items-center gap-4 mx-auto px-10 py-6">
            <div class="flex justify-between items-center w-full gap-4">
                <label for="email">Email:</label>
                <input class="text-input" type="email" id="email" v-model="email" required />
            </div>
            <div class="flex justify-between items-center w-full gap-4">
                <label for="password">Contraseña:</label>
                <input class="text-input" type="password" id="password" v-model="password" required />
            </div>
            <div class="flex justify-start items-center w-full gap-8">
                <label for="is_admin">Es Admin:</label>
                <input class="text-input" type="checkbox" id="is_admin" v-model="is_admin" />
            </div>
        </div>
        <button type="submit" class="px-4 py-2 bg-gray-500 text-white rounded">Registrar</button>
    </form>
</template>