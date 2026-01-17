<template>
    <div class="create-form-container">
        <h2>Nuevo Aptitud</h2>
        <form @submit.prevent="submitForm">
            <div class="inputs-container">
				<MaterialInput v-model="formFields.nombre"
					:label="'nombre'" 
					:type="'text'" 
					:error="!!errors.nombre" 
					:helper-text="errors.nombre || ''"
					:variant="'standard'"
				/>
				<MaterialSelect
					v-model.value="formFields.categoria"
					:options="categorias.map(cat => ({ value: cat.id, name: cat.nombre }))"
					:error="!!errors.categoria"
					:helper-text="errors.categoria || ''"
					:label="'categoria'"
					:multiple="false"
				/>
                <InputFile :name="'imagen'" v-model="formFields.imagen" v-model:errors="errors"/>
            </div>
            <div class="submit-btn-container">
                <SubmitButton :content="'Enviar'" :errors="Object.keys(errors).length !== 0"/>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import MaterialInput from '../composables/MaterialInput.vue';
import SubmitButton from '../composables/SubmitButton.vue';
import InputFile from '../composables/InputFile.vue';
import MaterialSelect from '../composables/MaterialSelect.vue';
import { useWebsiteStore } from '~/stores/perfiles';
import { AptitudRequestDto, type AptitudForm } from '~/server/entities/aptitudes/aptitudesRequest.dto';
import { useFormValidator } from '../composables/useFormValidator';
import { storeToRefs } from 'pinia';
import type { aptitudes_view } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';
const store = useWebsiteStore()
const { categorias, aptitudes } = storeToRefs(store)

const formFields = reactive<AptitudForm>({
	nombre: '',
	imagen: null,
	categoria: 1
})

const { errors, validateForm } = useFormValidator(formFields, AptitudRequestDto);

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
		const response = await $fetch('/api/aptitudes', {
			method: 'POST',
			body: formData
		});

		if (response.success) {
			alert('Certificate uploaded successfully!');
			aptitudes.value = [ ...aptitudes.value, response.data as aptitudes_view ]
			const defaults = new AptitudRequestDto()
			Object.entries(defaults).forEach(([key, value]) => formFields[key] = value)
		} else {
			alert('Failed to upload certificate. Please try again.');
		}
	} catch (error) {
		console.error('Error uploading certificate:', error);
		alert('An error occurred. Please try again.');
	}
};

onMounted(async ()=> {
	if (categorias.value.length == 0) {
		await callOnce(store.fetchCategorias)
	}
})
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
	flex-direction: column;
	gap: 5px;
}

</style>