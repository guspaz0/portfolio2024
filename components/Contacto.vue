<template>
  <section id="contacto" class="contacto">
    <h2>{{ titulo }}</h2>

    <div class="redes">
      <span
        v-for="red in redes"
        :key="red.nombre"
        class="card"
        @contextmenu.prevent=""
      >
        <b>{{ red.nombre }}</b>
        <a
          :href="red.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NuxtImg
            :src="Assets.CLOUD_URL + red.logo"
            :alt="red.nombre + ' logo'"
            loading="lazy"
          />
        </a>
      </span>
    </div>

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
        <MaterialTextArea
          v-model="mailData.message"
          :label="'Mensaje'"
          :rows="10"
          :cols="40"
          :error="!!errors.message"
          :helper-text="errors.message"
        />

        <span
          class="card"
          @click="handleSubmit"
          @contextmenu.prevent=""
          role="button"
          tabindex="0"
          @keydown.enter="handleSubmit"
          @keydown.space="handleSubmit"
        >
          Enviar
        </span>
      </fieldset>
    </form>
  </section>
</template>

<script setup lang="ts">
import { Assets } from '~/server/types/contacto'
import MaterialInput from './composables/MaterialInput.vue'
import MaterialTextArea from './composables/MaterialTextArea.vue'
// Reactive data
const titulo = "Contacto"

const redes = [
    {
        nombre: 'LinkedIn',
        logo: 'Logo-Linkedin_sjw3ee.png',
        href: 'https://www.linkedin.com/in/gustavo-rodolfo-paz-767951118/'
    },
    {
        nombre: 'Github',
        logo: 'github_logo_xodefl.png',
        href: 'https://github.com/guspaz0'
    }
]

// Form data
const mailData = reactive({
  subject: '',
  message: ''
})

const errors = ref<Record<string, string | undefined>>({})

// Methods
const handleSubmit = () => {
    // Validate form
    if (!subject.value.trim() || !body.value.trim()) {
        alert('Por favor completa todos los campos')
        return
    }

    // Create mailto URL with proper encoding
    const mailtoUrl = `mailto:gusti.paz@gmail.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(body.value)}`

    // Open email client
    window.open(mailtoUrl, '_blank')

    // Optional: Clear form after sending
    // subject.value = ''
    // body.value = ''
}

// SEO Meta tags (for Nuxt.js)
useHead({
    title: 'Contacto - Portfolio',
    meta: [
        { name: 'description', content: 'Ponte en contacto conmigo a través de mis redes sociales o envíame un mensaje' }
    ]
})
</script>
