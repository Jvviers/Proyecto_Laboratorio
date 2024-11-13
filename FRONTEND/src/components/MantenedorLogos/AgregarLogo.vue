<script setup>
import { ref } from 'vue';
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

const file = ref(null);
const imageUrl = ref('');
const public_id = ref('');
const uploading = ref(false);

const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUDNAME;
const uploadPreset = import.meta.env.PUBLIC_CLOUDINARY_LOGOS_PRESET;

const onFileChange = (event) => {
    file.value = event.target.files[0];
}

const uploadLogoToCloud = async () => {
    if (!file.value) return;
    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('upload_preset', uploadPreset);
    try {
        uploading.value = true;
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        imageUrl.value = data.secure_url;
        public_id.value = data.public_id;
        postLogo();
    } catch (error) {
        console.error('Error al subir el logo:', error);
    } finally {
        uploading.value = false;
    }
};

const postLogo = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/logos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: public_id.value,
                url: imageUrl.value,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Se ha agregado: ', data);
    } catch (error) {
        console.error('Error al agregar logo: ', error);
    }
};
</script>

<template>
    <form @submit.prevent="uploadLogoToCloud" class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">
        <div class="flex justify-center items-center w-full">
            <h2 class="text-2xl font-bold text-center text-utal">AGREGAR LOGO DE LABORATORIO</h2>
        </div>
        <div class="flex flex-col justify-center items-center w-full gap-4">
            <div v-if="imageUrl" class="flex flex-col justify-center items-center w-3/4 gap-2">
                <img :src="imageUrl" alt="Preview imagen subida" class="aspect-square w-full bg-neutral-200" />
                <span class="text-center text-sm">La imagen se ha subido correctamente!</span>
            </div>
            <div v-if="!imageUrl" class="flex flex-col justify-center items-center w-full gap-4">
                <button type="button" class="button relative overflow-hidden">SELECCIONAR IMAGEN
                    <input type="file" @change="onFileChange" accept="image/*" required
                        class="absolute top-0 left-0 w-full h-[60px] text-transparent opacity-0" />
                </button>
                <div class="flex flex-col justify-center items-center w-full gap-2 text-center text-sm">
                    <span v-if="file != null">Se ha cargado la imagen: <span class="font-bold">{{ file.name }}</span></span>
                    <span v-if="uploading">Subiendo...</span>
                </div>
            </div>
        </div>
        <div class="flex w-full justify-center items-center gap-8">
            <button v-if="!imageUrl" class="button-red" type="submit">AGREGAR</button>
            <button class="button" type="button" @click="closeModal">CERRAR</button>
        </div>
    </form>
</template>