<script setup></script>

<template>
    <nav class="flex w-full h-auto justify-between items-center border-b border-gray-300">
        <div class="flex items-center gap-6 px-12 py-4">
            <a href="/" aria-label="logo utal">
                <img src="/logo.svg" alt="logo utal" class="w-20 h-20" />
            </a>
            <div class="flex flex-col justify-center items-center text-center text-nowrap">
                <h3 class="text-xl font-bold leading-tight ">Vicerrectoría de Pregrado</h3>
                <h4 class="text-lg leading-tight">Universidad de Talca</h4>
            </div>
        </div>
        <div class="flex items-center px-12">
            <a href="/admin" aria-label="acceso admin">
                <button class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 text-nowrap rounded">
                    Acceso Admin
                </button>
            </a>
        </div>
    </nav>
</template>