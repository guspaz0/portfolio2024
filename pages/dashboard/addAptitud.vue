<!-- components/createCertificado.vue -->

<template>
    <div class="create-form-container">
        <h2>Nuevo Aptitud</h2>
        <form @submit.prevent="submitForm">
            <div class="inputs-container">
                <div>
                    <label for="certificate">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" v-model="nombre"/>
                    <small v-if="errors.nombre" class="errors">{{ errors.nombre }}</small>
                    </div>
                <div>
                    <label for="certificate">Logo File:</label>
                    <input type="file" id="imagen" name="imagen" accept=".jpg,.png,.jpeg" :change="onFileChange"/>
                    <small v-if="errors.imagen" class="errors">{{ errors.imagen }}</small>
                </div>
            </div>
            <div class="submit-btn-container">
                <button type="submit">Enviar</button>
                <small v-if="errors" class="errors">Corregir los errores</small>
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
const imagen = ref<File | null>(null);
const nombre = ref('')
const errors = ref<Partial<Aptitud>>({})

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    imagen.value = target.files[0];
    errors.value = { ...errors.value, imagen: undefined }
  } else {
    errors.value = { ...errors.value, imagen: 'Imagen es requerida.' }
  }
};

watch(() => nombre.value, (newVal) => {
  nombre.value = newVal
  if (newVal.length == 0) {
    errors.value = { ... errors.value, nombre: 'Nombre es requerido.' }
  } else {
    errors.value = { ... errors.value, nombre: undefined }
  }
})

const submitForm = async () => {

  const formData = new FormData();
  formData.append('imagen', imagen.value)
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
.create-form-container {
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

small.errors {
  color: red;
}
</style>