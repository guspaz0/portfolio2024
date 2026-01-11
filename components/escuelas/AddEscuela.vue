<template>
    <div class="create-form-container">
        <h2>Nueva Escuela</h2>
        <form @submit.prevent="submitForm">
            <div class="inputs-container">
                <Input :name="'nombre'" :type="'text'" :error="errors.nombre" v-model="nombre"/>
                <InputFile :name="'imagen'" v-model="imagen" :errors="errors"/>
            </div>
            <SubmitButton :content="'Enviar'" :errors="Object.keys(errors).length == 0"/>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Aptitud } from '~/server/entities/aptitudes/Aptitudes.entity';
import Input from '../customComponents/Input.vue';
import SubmitButton from '../customComponents/SubmitButton.vue';
import InputFile from '../customComponents/InputFile.vue';

const imagen = ref<File | null>(null);
const nombre = ref('')
const errors = ref<Partial<Aptitud>>({})

watch(() => nombre.value, (newVal) => {
    nombre.value = newVal
    if (newVal.length == 0) {
        errors.value = { ... errors.value, nombre: 'Nombre es requerido.' }
    } else {
        errors.value = { ... errors.value, nombre: undefined }
    }
})

watch(() => imagen.value, (newVal) => {
    console.log(newVal)
    if (newVal?.length == 0 || newVal == null) {
        errors.value = { ... errors.value, imagen: 'imagen es requerido.' }
    }
})

const submitForm = async () => {

    const formData = new FormData();
    formData.append('imagen', imagen.value)
    formData.append('nombre', nombre.value)

    try {
        // Assuming you have an API endpoint to handle file uploads
        const response = await $fetch('/api/escuelas', {
            method: 'POST',
            body: formData
        });

        if (response.success) {
            alert('Certificate uploaded successfully!');
        } else {
            alert('Failed to upload certificate. Please try again.');
        }
    } catch (error) {
        console.error('Error uploading certificate:', error);
        alert('An error occurred. Please try again.');
    }
};
</script>

<style scoped>
.create-form-container {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.create-form-container h2 {
    text-align: center;
}

.create-form-container form {
    display: flex;
    flex-direction: column;
}

.create-form-container label {
    margin-bottom: 5px;
}

.create-form-container input[type="file"] {
    margin-bottom: 10px;
}

.create-form-container button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.create-form-container button:hover {
    background-color: #0056b3;
}

.create-form-container .inputs-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.create-form-container .submit-btn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
}

</style>