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
          <img
            :src="assets.CLOUD_URL + red.logo"
            :alt="red.nombre + ' logo'"
            loading="lazy"
          />
        </a>
      </span>
    </div>

    <form @submit.prevent="handleSubmit">
      <fieldset>
        <legend>Correo</legend>

        <label for="subject">Asunto:</label>
        <input
          v-model="subject"
          id="subject"
          type="text"
          name="subject"
          placeholder="Escribe el asunto del mensaje"
          required
        />

        <label for="body">Mensaje:</label>
        <textarea
          v-model="body"
          id="body"
          name="body"
          rows="10"
          cols="40"
          placeholder="Escribe tu mensaje aquí..."
          required
        ></textarea>

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

<script setup>
// Import your variables (you'll need to convert var.js to ESM)
// import { cloudurl } from '~/utils/var.js'

// Mock cloudurl - replace with your actual import
const assets = await $fetch('/api/assets')

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
const body = ref('')
const subject = ref('')

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
