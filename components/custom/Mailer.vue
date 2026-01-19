<script setup land="ts">
import { MailRequestDto } from '~/server/entities/email/mailRequestDto';
const toast = useToast()
// Form data
const mailData = reactive({
    subject: '',
    text: '',
    from: ''
})

const { errors, validateForm } = useFormValidator(mailData, MailRequestDto)

watch(mailData, () => validateForm())

// Methods
const handleSubmit = async () => {
    try {
        const isFine = await validateForm()
        if (!isFine) {
            toast.error({ title: 'Error!', message: 'Corregir los errores del formulario'})
            return
        }
        
        const res = await $fetch('/api/smtp', {
            method: 'POST',
            body: mailData
        })
        if (res) {
            toast.success({ title: 'Email enviado!', message: 'Te responderé lo mas rapido posible ASAP!' })
            const defaults = new MailRequestDto()
            Object.entries(defaults).forEach(([key, value]) => mailData[key] = value)
        }
    } catch (e) {
        toast.error({ title: 'Error del servidor!', message: 'Contactame con tu cliente de correo'})
        // Create mailto URL with proper encoding
        const mailtoUrl = `mailto:?cc=gusti.paz@gmail.com&subject=${encodeURIComponent(mailData.subject)}&body=${encodeURIComponent(mailData.text)}`
        // Open email client
        window.open(mailtoUrl, '_blank')
    }
}
</script>
<template>
    <form @submit.prevent="handleSubmit">
        <fieldset>
        <legend>Correo</legend>

        <MaterialInput
            :id="'subject'"
            v-model="mailData.subject"
            :type="'text'"
            :label="'Asunto'"
            :error="!!errors.subject"
            :helper-text="errors.subject || ''"
            :variant="'standard'"
        />
        <MaterialInput
            :id="'from'"
            v-model="mailData.from"
            :type="'text'"
            :label="'Correo electronico'"
            :error="!!errors.from"
            :helper-text="errors.from || ''"
            :variant="'standard'"
        />
        <MaterialTextArea
            v-model="mailData.text"
            :label="'Mensaje'"
            :rows="10"
            :cols="40"
            :error="!!errors.text"
            :helper-text="errors.text"
        />
        <CustomSubmitButton/>
        </fieldset>
    </form>
</template>

<style scoped>
fieldset, * {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>