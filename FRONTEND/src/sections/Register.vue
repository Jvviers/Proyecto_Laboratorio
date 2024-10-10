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
    <div>
        <h2>Registro de Usuario</h2>
        <form @submit.prevent="register">
            <div>
                <label for="email">Email:</label>
                <input id="email" type="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="password" required />
            </div>
            <div>
                <label for="is_admin">¿Es Administrador?</label>
                <input id="is_admin" type="checkbox" v-model="is_admin" />
            </div>
            <button type="submit">Registrar</button>
        </form>
    </div>
</template>