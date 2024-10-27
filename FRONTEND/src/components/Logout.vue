<script setup>
import { ref, onMounted } from 'vue';

const sessionActive = ref(false); 


const checkSession = async () => {
    try {
        const response = await fetch('http://localhost:3000/session', { 
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            sessionActive.value = true; 
        }
    } catch (error) {
        console.error('Error al verificar sesión:', error);
    }
};

onMounted(() => {
    checkSession(); 
});

const logout = async () => {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Usuario deslogeado:', data);
        sessionActive.value = false; // Oculta el botón tras cerrar sesión
    
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
    goToLogin();
};

const goToLogin = () => {
    window.location.href = '/login';
};

</script>

<template>
    <div>
        <div v-if="sessionActive">
            <button @click="logout" class="button">Cerrar Sesión</button>
        </div>
        <div v-else>
            <button onclick="location.href='/admin'" class="button" type="button">Acceso Admin</button>
        </div>
    </div>
</template>
