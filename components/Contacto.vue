<template>
  <section id="contacto" class="contacto">
    <h2>Contacto</h2>

    <div class="redes">
      <span v-for="red in redes"
        :key="red.nombre"
        @contextmenu.prevent=""
      >
        <NuxtLink
          :href="red.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NuxtImg
            :src="red.src"
            :alt="red.nombre + ' logo'"
            loading="lazy"
            :height="30"
          />
        </NuxtLink>
      </span>
    </div>
    <CustomMailer/>
  </section>
</template>

<script setup lang="ts">

const redes = [
    {
        nombre: 'LinkedIn',
        src: "https://custom-icon-badges.demolab.com/badge/Linkedin-0A66C2?logo=linkedin-white&logoColor=fff",
        href: 'https://www.linkedin.com/in/gustavo-rodolfo-paz/'
    },
    {
        nombre: 'Github',
        src: "https://custom-icon-badges.demolab.com/badge/Github-fff?logo=github&logoColor=111",
        href: 'https://github.com/guspaz0'
    }
]

// SEO Meta tags (for Nuxt.js)
useHead({
    title: 'Contacto - Portfolio',
    meta: [
        { 
          name: 'keywords', 
          content: 'contacto, portfolio, gustavo rodolfo paz, desarrollo, software, full stack' 
        }
    ]
})
</script>
