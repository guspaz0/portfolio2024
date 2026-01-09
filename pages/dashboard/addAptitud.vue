<!-- components/createCertificado.vue -->

<template>
    <div class="create-certificado">
        <h2>Nuevo Aptitud</h2>
        <form @submit.prevent="submitForm">
            <div>
                <div>
                    <label for="certificate">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" v-model="nombre"/>
                    <small v-if="errors.nombre" :class="errors">{{ errors.nombre }}</small>
                    </div>
                <div>
                    <label for="certificate">Logo File:</label>
                    <input type="date" id="fecha" name="fecha" v-model="fecha"/>
                    <small v-if="errors.imagen" :class="errors">{{ errors.imagen }}</small>
                </div>
            </div>
            <div>
                <button type="submit">Enviar</button>
                <small v-if="errors" :class="errors">Corregir los errores</small>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Aptitud } from '~/server/entities/aptitudes/Aptitudes.entity';
definePageMeta({
    layout: 'dashboard'
})
const imageFile = ref<File | null>(null);
const nombre = ref('')
const fecha = ref('')
const errors = ref<Partial<Aptitud>>({})

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    imageFile.value = target.files[0];
  }
};

watch(nombre, (newVal) => nombre.value = newVal)
watch(fecha, (newVal) => fecha.value = newVal)

function validateForm(){
  if (!imageFile.value) {
    alert('Please select a file to upload.');
    return;
  }
}

const submitForm = async () => {

  const formData = new FormData();
  formData.append('image', imageFile.value)
  formData.append('nombre', nombre.value)

  try {
    // Assuming you have an API endpoint to handle file uploads
    const response = await $fetch('/api/aptitudes', {
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
.create-certificado {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.create-certificado h2 {
  text-align: center;
}

.create-certificado form {
  display: flex;
  flex-direction: column;
}

.create-certificado label {
  margin-bottom: 5px;
}

.create-certificado input[type="file"] {
  margin-bottom: 10px;
}

.create-certificado button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-certificado button:hover {
  background-color: #0056b3;
}
</style>