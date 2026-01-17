<template>
    <div class="create-form-container">
        <h2>Nuevo Proyecto</h2>
        <form @submit.prevent="submitForm">
            <div class="inputs-container">
                <MaterialInput class="item"
					v-model="formFields.nombre"
					:label="'nombre'" 
					:type="'text'" 
					:error="!!errors.nombre" 
					:helper-text="errors.nombre || ''"
					:variant="'standard'"
				/>
                <MaterialInput class="item"
					v-model="formFields.fecha"
					:label="'fecha'" 
					:type="'date'" 
					:error="!!errors.fecha"
					:helper-text="errors.fecha || ''"
					:variant="'standard'"
				/>
                <MaterialInput class="item"
					v-model="formFields.repositorio"
					:label="'repositorio'" 
					:type="'text'" 
					:error="!!errors.repositorio" 
					:helper-text="errors.repositorio || ''"
					:variant="'standard'"
				/>
                <MaterialInput class="item"
					v-model="formFields.deploy"
					:label="'deploy'" 
					:type="'text'" 
					:error="!!errors.deploy" 
					:helper-text="errors.deploy || ''"
					:variant="'standard'"
				/>
				<MaterialTextArea class="item" 
					v-model="formFields.descripcion"
					:label="'descripcion'"
					:error="!!errors.descripcion" 
					:helper-text="errors.descripcion || ''"
				/>
                <InputFile class="item"
					v-model="formFields.imagen" 
					v-model:errors="errors"
					:name="'imagen'" 
				/>
                <MaterialSelect class="item"
					v-model:value="formFields.aptitudes"
                    :label="'aptitudes'" 
                    :options="aptitudes.map((apt) => ({ value: apt.id, name: apt.nombre }))"
                    :error="!!errors.aptitudes"
                    :helper-text="errors?.aptitudes || ''"
                    :multiple="true"
                />
				<MaterialSelect class="item"
					v-model:value="formFields.perfiles"
                    :label="'perfiles'" 
                    :options="perfiles.map((perfil) => ({ value: perfil.id, name: perfil.nombre }))"
                    :error="!!errors.perfiles"
                    :helper-text="errors?.perfiles || ''"
                    :multiple="true"
                />
            </div>
            <div class="submit-btn-container">
                <SubmitButton :content="'Enviar'" :errors="Object.keys(errors).length == 0"/>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import SubmitButton from '../composables/SubmitButton.vue';
import InputFile from '../composables/InputFile.vue';
import MaterialTextArea from '../composables/MaterialTextArea.vue';
import MaterialSelect from '../composables/MaterialSelect.vue';
import MaterialInput from '../composables/MaterialInput.vue';
import { useWebsiteStore } from '~/stores/perfiles';
import { ProyectoRequestDto, type ProyectoForm } from '~/server/entities/proyectos/ProyectoForm.dto';
import { storeToRefs } from 'pinia';
import { useFormValidator } from '../composables/useFormValidator';
const store = useWebsiteStore()
const { aptitudes, perfiles, proyectos } = storeToRefs(store)

const formFields = reactive<ProyectoForm>({
    nombre: '',
    descripcion: '',
    fecha: new Date().toISOString().split("T")[0],
    repositorio: '',
    deploy: '',
	imagen: null,
	aptitudes: [],
	perfiles: []
});

const { errors, validateForm } = useFormValidator(formFields, ProyectoRequestDto);

watch(formFields, () => validateForm())

const submitForm = async () => {
	const isFine = await validateForm()
	if (!isFine) throw new Error('Corregir errores del formulario')

	const formData = new FormData();
	Object.entries(formFields)
		.forEach(([key,value]) => 
			formData.append(key, value)
	)
	try {
		// Assuming you have an API endpoint to handle file uploads
		const response = await $fetch('/api/proyectos', {
		method: 'POST',
		body: formData
		});

		if (response.success) {
			alert('Certificate uploaded successfully!');
			proyectos.value = [ ...proyectos.value, response.data ]
			const defaults = new ProyectoRequestDto()
			Object.entries(defaults).forEach(([key, value]) => formFields[key] = value)
		} else {
			alert('Failed to upload certificate. Please try again.');
		}
	} catch (error) {
		console.error('Error uploading certificate:', error);
		alert('An error occurred. Please try again.');
	}
};

onMounted(async () => {
    if (aptitudes.value.length == 0) {
        await callOnce(store.fetchAptitudes)
    }
	if (perfiles.value.length == 0) {
		await callOnce(store.fetchPerfiles)
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