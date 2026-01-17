<template>
    <div class="create-form-container">
        <h2>Nueva Escuela</h2>
        <form @submit.prevent="submitForm">
            <div class="inputs-container">
                <MaterialInput v-model="formFields.nombre"
					:label="'nombre'" 
					:type="'text'" 
					:error="!!errors.nombre" 
					:helper-text="errors.nombre || ''"
					:variant="'standard'"
				/>
                <InputFile 
                    :name="'imagen'" 
                    v-model="formFields.imagen" 
                    v-model:errors="errors"
                />
            </div>
            <SubmitButton :content="'Enviar'" :errors="Object.keys(errors).length == 0"/>
        </form>
    </div>
</template>

<script setup lang="ts">
import SubmitButton from '../composables/SubmitButton.vue';
import MaterialInput from '../composables/MaterialInput.vue';
import InputFile from '../composables/InputFile.vue';
import type { Escuelas } from '@prisma/client';
import { EscuelaRequestDto, type EscuelaForm } from '~/server/entities/escuelas/EscuelaRequest.dto';
import { useFormValidator } from '../composables/useFormValidator';
const store = useWebsiteStore()
const { escuelas } = storeToRefs(store)

const formFields = reactive<EscuelaForm>({
	nombre: '',
	imagen: null
})

const { errors, validateForm } = useFormValidator(formFields, EscuelaRequestDto);

watch(formFields, () => validateForm())

const submitForm = async () => {
	const isError = await validateForm()
	if (!isError) throw new Error('Corregir errores del formulario')

	const formData = new FormData();
	Object.entries(formFields)
		.forEach(([key,value]) => 
			formData.append(key, value)
	)
	try {
		// Assuming you have an API endpoint to handle file uploads
		const response = await $fetch('/api/escuelas', {
			method: 'POST',
			body: formData
		});

		if (response.success) {
			alert('Certificate uploaded successfully!');
			escuelas.value = [ ...escuelas.value, response.data as Escuelas ]
			const defaults = new EscuelaRequestDto()
			Object.entries(defaults).forEach(([key, value]) => formFields[key] = value)
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

.create-form-container .inputs-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
  align-items: flex-start;
	gap: 5px;
}

.create-form-container .inputs-container .item {
	flex-basis: calc(50% - 10px);
	box-sizing: border-box;
  flex-grow: 1;
}
</style>