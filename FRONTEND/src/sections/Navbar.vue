<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sessionActive = ref(false);
const ruta = ref('');

const isDropdownVisible = ref(false);

const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
};

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
    goToHome();
};

const goToHome = () => {
    window.location.href = '/';
};

onMounted(() => {
    const handleClickOutside = (event) => {
        const dropdown = document.getElementById('dropdown');
        const menuToggle = document.getElementById('menu-toggle');
        const isClickInsideDropdown = dropdown?.contains(event.target);
        const isClickOnMenuToggle = menuToggle?.contains(event.target);

        if (!isClickInsideDropdown && !isClickOnMenuToggle) {
            isDropdownVisible.value = false;
        }
    };
    document.addEventListener('click', handleClickOutside);

    checkSession();
    ruta.value = window.location.pathname;

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
    });
});
</script>

<template>
    <nav class="flex w-full justify-between items-center border-b px-8 md:px-32 border-gray-300">
        <a href="/" aria-label="logo" class="logo">
            <div class="flex items-center gap-2 py-4">
                <img src="/logo.svg" alt="logo utal" class="w-20 h-20" />
                <div class="hidden md:flex flex-col justify-center items-start text-start border-l border-black pl-2 w-44 gap-[2px]">
                    <h3 class="text-lg font-semibold leading-none">Dirección de Innovación y Transferencia</h3>
                    <h4 class="text-sm font-medium leading-none">Vicerrectoría Académica</h4>
                </div>
            </div>
        </a>
        <div class="hidden md:flex items-center px-12">
            <div v-if="sessionActive && ruta == '/admin'">
                <button @click="logout" class="button">Cerrar Sesión</button>
            </div>
            <div v-else>
                <button onclick="location.href='/admin'" class="button" type="button">Acceso Admin</button>
            </div>
        </div>
        <div class="flex items-center md:hidden cursor-pointer">
            <button @click="toggleDropdown()" id="menu-toggle" class="text-gray-600 focus:outline-none">
                <img src="/menu.svg" alt="menu" class="w-8 h-8" />
            </button>
        </div>
        <div v-if="isDropdownVisible" id="dropdown"
            class="absolute top-20 right-4 bg-white shadow-lg rounded w-48 p-2 z-20 md:hidden transitions">
            <ul class="flex flex-col gap-2 w-full">
                <li class="w-full hover:bg-utal/10 py-2 px-4 rounded cursor-pointer transitions"><a href="/">Inicio</a></li>
                <li class="w-full hover:bg-utal/10 py-2 px-4 rounded cursor-pointer transitions"><a href="/admin">Acceso Admin</a></li>
                <li v-if="sessionActive" @click="logout()" class="w-full hover:bg-utal/10 py-2 px-4 rounded cursor-pointer transitions"><a href="/">Cerrar Sesión</a></li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
    .logo {
        font-family: 'Geologica Variable', sans-serif;
    }
</style>