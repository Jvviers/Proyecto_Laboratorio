<script setup>
import * as UC from "@uploadcare/file-uploader";
import "@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css"
import { ref } from "vue";

UC.defineComponents(UC);
const PUBLIC_UPLOADCARE_KEY = import.meta.env.PUBLIC_UPLOADCARE_KEY

const props = defineProps({
    uploaderCtxName: String,
    uploaderClassName: String,
    files: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(["update:files"]);

const uploadedFiles = ref([]);
const ctxProviderRef = ref(null);

function handleChangeEvent(e) {
    if (e.detail) {
        uploadedFiles.value = e.detail.allEntries.filter(
            (f) => f.status === "success"
        );
    }
};

function handleModalCloseEvent() {
    emit("update:files", [...props.files, ...uploadedFiles.value]);
    uploadedFiles.value = [];
};
</script>

<template>
    <div class="uploader flex justify-center items-center">
        <uc-config :ctx-name="uploaderCtxName" :pubkey=PUBLIC_UPLOADCARE_KEY use-cloud-image-editor="false"
            source-list="local, url, gdrive" confirmUpload="false" removeCopyright multiple="false"></uc-config>
        <uc-upload-ctx-provider ref="ctxProviderRef" :ctx-name="uploaderCtxName" @change="handleChangeEvent"
            @modal-close="handleModalCloseEvent"></uc-upload-ctx-provider>
        <uc-file-uploader-regular :ctx-name="uploaderCtxName" class="uploader"></uc-file-uploader-regular>
    </div>
</template>

<style scoped>
.uploader {
    --uc-font-family: system-ui;
    --uc-font-size: 14px;
    --uc-line-height: normal;
    --uc-button-size: 32px;
    --uc-preview-size: 32px;
    --uc-padding: 10px;
    --uc-radius: 4px;
    --uc-transition: 0.3s ease;
    --uc-dialog-width: 430px;
    --uc-dialog-max-width: 800px;
    --uc-dialog-max-height: 600px;
    --uc-simple-btn-font-size: 15px;
    --uc-simple-btn-padding: 8px 16px;

    --uc-simple-btn-light: #e5e7eb;
    /* Fondo Botón */
    --uc-simple-btn-hover-light: #d1d1d1;
    /* Hover Fondo Botón */
    --uc-simple-btn-foreground-light: #242424;
    /* Texto Botón */
    --uc-background-light: #fff;
    /* Fondo Modal */
    --uc-foreground-light: #242424;
    /* Texto Modal */
    --uc-primary-transparent-light: #e5e7eb;
    /* Fondo Inputs Modal */
    --uc-secondary-light: #e5e7eb;
    /* Fondo Botón Modal */
    --uc-secondary-hover-light: #d1d1d1;
    /* Hover Fondo Botón Modal */
    --uc-secondary-foreground-light: #242424;
    /* Texto Botón Modal */
    --uc-muted-light: #e5e7eb;
    /* Fondo Icono Dropzone Modal */
    --uc-border-light: #e5e7eb;
    /* Borde Dropzone Modal */

    --uc-simple-btn-dark: #e5e7eb;
    --uc-simple-btn-hover-dark: #d1d1d1;
    --uc-simple-btn-foreground-dark: #242424;
    --uc-background-dark: #fff;
    --uc-foreground-dark: #242424;
    --uc-primary-transparent-dark: #e5e7eb;
    --uc-secondary-dark: #e5e7eb;
    --uc-secondary-hover-dark: #d1d1d1;
    --uc-secondary-foreground-dark: #242424;
    --uc-muted-dark: #e5e7eb;
    --uc-border-dark: #e5e7eb;
}
</style>