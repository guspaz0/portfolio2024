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
				<AptitudesIconSearch 
					v-model="formFields.icon"
					:error="!!errors.icon"
					:helper-text="errors.icon"
				/>
                <CustomInputFile :name="'imagen'" v-model="formFields.imagen" v-model:errors="errors"/>
            </div>
            <div class="submit-btn-container">
                <CustomSubmitButton :content="'Enviar'" :errors="Object.keys(errors).length !== 0"/>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { AptitudRequestDto, type AptitudForm } from '~/server/entities/aptitudes/aptitudesRequest.dto';
const toast = useToast()
const store = useWebsiteStore()
const { categorias, aptitudes } = storeToRefs(store)

const formFields = reactive<AptitudForm>({
	nombre: '',
	icon: '',
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
			toast.success({ title: 'Guardado', message: 'Escuela creada exitosamente!'});
			aptitudes.value = [ ...aptitudes.value, response.data as aptitudes_view ]
			const defaults = new AptitudRequestDto()
			Object.entries(defaults).forEach(([key, value]) => formFields[key] = value)
		} else {
			throw new Error(response.message || 'Error al crear escuela')
		}
	} catch (error) {
		toast.error({ title: 'Error', message: error.message });
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