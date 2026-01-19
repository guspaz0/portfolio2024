<template>
  <div class="create-form-container">
    <h2>Nuevo certificado</h2>
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
          :label="'Fecha'" 
          :type="'date'" 
          :error="!!errors.fecha" 
          :helper-text="errors.fecha || ''"
          :variant="'standard'"
				/>
        <MaterialSelect class="item"
          v-model:value="formFields.aptitudes"
          :label="'Aptitudes'" 
          :options="aptitudes.map((apt) => ({ value: apt.id, name: apt.nombre }))"
          :error="!!errors.aptitudes"
          :helper-text="errors?.aptitudes || ''"
          :multiple="true"
        />
        <MaterialSelect class="item"
          v-model:value="formFields.perfiles"
          :label="'Perfiles'"
          :options="perfiles.map((perfil) => ({ value: perfil.id, name: perfil.nombre }))"
          :error="!!errors.perfiles"
          :helper-text="errors?.perfiles || ''"
          :multiple="true"
        />
        <MaterialSelect class="item"
          v-model:value="formFields.escuela"
          :label="'Escuela'"
          :placeholder="'Escuela'"
          :options="escuelas.map((esc) => ({ value: esc.id, name: esc.nombre }))"
          :error="!!errors.escuela"
          :helper-text="errors?.escuela || ''"
          :multiple="false"
        />
        <CustomInputFile 
          :name="'imagen'" 
          v-model="formFields.imagen" 
          v-model:errors="errors"
        />
      </div>
      <div class="submit-btn-container">
          <CustomSubmitButton />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { CertificadoRequestDto, type CertificadoForm } from '~/server/entities/certificados/certificadosRequestDto';
const toast = useToast()
const store = useWebsiteStore()
const { aptitudes, perfiles, escuelas, certificados } = storeToRefs(store)

const formFields = reactive<CertificadoForm>({
  nombre: '',
  fecha: new Date().toISOString().split('T')[0],
  imagen: null,
  aptitudes: [],
  perfiles: [],
  escuela: 0
})

const { errors, validateForm } = useFormValidator(formFields, CertificadoRequestDto);

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
    const response = await $fetch('/api/certificados', {
      method: 'POST',
      body: formData
    });

    if (response.success) {
      toast.success({ title: 'Guardado', message: 'Certificado creado exitosamente!'});
      certificados.value = [ ...certificados.value, response.data]
      const defaults = new CertificadoRequestDto()
      Object.entries(defaults).forEach(([key, value]) => formFields[key] = value)
    } else {
			throw new Error(response.message || 'Error al crear escuela')
		}
	} catch (error) {
		toast.error({ title: 'Error', message: error.message });
  }
};

onMounted(async () => {
  if (aptitudes.value.length == 0) {
    await callOnce(store.fetchAptitudes)
  }
	if (perfiles.value.length == 0) {
		await callOnce(store.fetchPerfiles)
	}
  if (escuelas.value.length == 0) {
    await callOnce(store.fetchEscuelas)
  }
})
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