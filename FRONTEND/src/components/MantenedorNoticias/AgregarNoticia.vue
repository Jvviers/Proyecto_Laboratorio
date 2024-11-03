<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
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

const title = ref('');
const description = ref('');
const file = ref(null);
const imageUrl = ref('');
const public_id = ref('');
const uploading = ref(false);

const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUDNAME;
const uploadPreset = import.meta.env.PUBLIC_CLOUDINARY_NOTICIAS_PRESET;

const onFileChange = (event) => {
    file.value = event.target.files[0];
}

const uploadImageToCloud = async () => {
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
        postNoticia();
    } catch (error) {
        console.error('Error al subir la imagen:', error);
    } finally {
        uploading.value = false;
    }
};

const postNoticia = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/noticias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: title.value,
                descripcion: description.value,
                url: imageUrl.value,
                public_id: public_id.value,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Se ha agregado: ', data);
    } catch (error) {
        console.error('Error al agregar noticia: ', error);
    }
};
</script>
<template>
    <form @submit.prevent="uploadImageToCloud"
        class="flex flex-col justify-center items-center gap-6 py-4 px-12 w-full">
        <div class="flex justify-center items-center w-full">
            <h1 class="text-2xl text-center font-bold">AGREGAR NOTICIA</h1>
        </div>
        <div class="flex flex-col justify-center items-center w-full gap-4">
            <div v-if="!imageUrl" class="flex flex-col justify-center items-center w-full gap-4">
                <div class="flex flex-col justify-start items-start w-full gap-1">
                    <label for="title">Título:</label>
                    <input placeholder="Título de la noticia" class="input w-full" type="text" id="title"
                        v-model="title" required />
                </div>
                <div class="flex flex-col justify-start items-start w-full gap-1">
                    <label for="description">Descripción:</label>
                    <textarea placeholder="Escriba aquí la descripción de la noticia"
                        class="input w-full h-32 resize-none" id="description" v-model="description" required />
                </div>
                <button type="button" class="button relative overflow-hidden">SELECCIONAR IMAGEN
                    <input type="file" @change="onFileChange" accept="image/*" required
                        class="absolute top-0 left-0 w-full h-[60px] text-transparent opacity-0" />
                </button>
                <div class="flex flex-col justify-center items-center w-full gap-2 text-center text-sm">
                    <span v-if="file != null">Se ha cargado la imagen: <span class="font-bold">{{ file.name
                            }}</span></span>
                    <span v-if="uploading">Subiendo...</span>
                </div>
            </div>
            <div v-if="imageUrl" class="flex flex-col justify-center items-center w-full gap-2">
                <div class="flex flex-col justify-start items-start w-3/4 p-2 gap-2 text-start border border-gray-300 rounded bg-gray-200">
                    <img :src="imageUrl" alt="Preview imagen subida" class="aspect-video w-full" />
                    <h2 class="text-base font-bold leading-5">{{ title }}</h2>
                    <p class="text-xs text-gray-500">{{ description }}</p>
                </div>
                <span class="text-center text-sm">La noticia se ha subido correctamente!</span>
            </div>
        </div>
        <div class="flex w-full justify-center items-center gap-8">
            <button v-if="!imageUrl" class="button" type="submit">AGREGAR</button>
            <button class="button" type="button" @click="closeModal">CERRAR</button>
        </div>
    </form>
</template>