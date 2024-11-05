<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

const sessionActive = ref(false);
const ruta = ref('');

const isDropdownVisible = ref(false);

const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
};

const checkSession = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/session', {
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
        const response = await fetch(BACKEND_URL + '/logout', {
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
    <nav class="flex flex-col w-full px-8 md:px-32 shadow-md ">
        <div class="flex flex-col items-end w-full">
            <span class="h-6 w-full bg-utal"></span>
            <span class="h-6 w-2/3 border-b border-gray-300 hidden md:flex justify-end items-center gap-4 text-xs text-nowrap font-normal text-gray-500">
                <h4>Visítanos en 19 norte #1665, Talca</h4>
                <h4>Escríbenos a utal.adm@gmail.com</h4>
            </span>
        </div>
        <div class="flex w-full justify-between items-center">
            <a href="/" aria-label="logo" class="geologica">
                <div class="flex items-center gap-2 py-4">
                    <img src="/icons/logo.svg" alt="logo utal" class="w-20 h-20 pr-1 border-r border-[#9d9d9d]" />
                    <div class="hidden md:flex flex-col justify-center items-start text-start pl-1 w-44 gap-[2px]">
                        <h3 class="text-lg font-semibold leading-none">Dirección de Innovación y Transferencia</h3>
                        <h4 class="text-sm font-medium leading-none text-[#9d9d9d]">Vicerrectoría Académica</h4>
                    </div>
                </div>
            </a>
            <div class="hidden md:flex items-center">
                <div v-if="sessionActive && ruta == '/admin'">
                    <button @click="logout" class="button">CERRAR SESIÓN</button>
                </div>
                <div v-else>
                    <button onclick="location.href='/admin'" class="button" type="button">ACCESO ADMIN</button>
                </div>
            </div>
            <div class="flex items-center md:hidden cursor-pointer">
                <button @click="toggleDropdown()" id="menu-toggle" class="text-gray-600 focus:outline-none">
                    <img src="/icons/menu.svg" alt="menu" class="w-8 h-8" />
                </button>
            </div>
            <div v-if="isDropdownVisible" id="dropdown"
                class="absolute top-20 right-4 bg-white shadow-lg rounded w-48 p-2 z-20 md:hidden transitions">
                <ul class="flex flex-col gap-2 w-full font-medium text-sm">
                    <li class="w-full hover:bg-utal/10 py-2 px-4 rounded cursor-pointer transitions"><a href="/">INICIO</a></li>
                    <li class="w-full hover:bg-utal/10 py-2 px-4 rounded cursor-pointer transitions"><a href="/admin">ACCESO ADMIN</a></li>
                    <li v-if="sessionActive" @click="logout()" class="w-full hover:bg-utal/10 py-2 px-4 rounded cursor-pointer transitions"><a href="/">CERRAR SESIÓN</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>