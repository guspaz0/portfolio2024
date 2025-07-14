<template>
    <article @contextmenu.prevent>
    <b>{{ cert.nombre }}</b>
    <span>
        <NuxtImg
        :src="cert?.escuela.imagen"
        :alt="cert?.escuela.nombre"
        format="webp"
        loading="lazy" />
    </span>
    <b>Tecnologias:</b>
    <div class="proyectos">
        <span
        v-for="tec in cert.aptitudes?.slice(0, 2)"
        :key="tec.id"
        class="skills"
        @contextmenu.prevent
        >
        <small>{{ tec.nombre }}</small>
        <NuxtImg
            :src="tec.imagen"
            :alt="tec.nombre"
            format="webp"
            loading="lazy"
        />
        </span>
        <span
        v-if="cert?.aptitudes.length > 2"
        class="skills"
        @mouseenter="showAptitudes"
        @contextmenu.prevent
        >
        <b>+{{ cert.aptitudes.length - 2 }}</b>
        </span>
        <dialog
        v-if="cert.aptitudes.length > 3"
        @mouseleave="showAptitudes"
        @contextmenu.prevent
        >
        <span v-for="tec in cert.aptitudes" :key="tec.id" class="skills">
            <small>{{ tec.nombre }}</small>
            <NuxtImg
            :src="tec.imagen"
            :alt="tec.nombre"
            format="webp"
            loading="lazy" />
        </span>
        </dialog>
    </div>
    <a
        v-if="cert.imagen"
        :href="cert.imagen"
        rel="noreferrer noopener"
        target="_blank"
    >
        Certificado
    </a>
    </article>
</template>

<script setup lang="ts">

import { Certificado } from '~/server/entities/certificados/Certificados.entity'
import type { PropType } from 'vue'

const props = defineProps({
  cert: {
    type: Object as PropType<Certificado>,
    required: true
  }
})

const showAptitudes = (e) => {
  const skills = Array.from(e.target.parentNode.childNodes)
    .filter(s => s.tagName === 'DIALOG')

  if (e.type === 'mouseenter') {
    skills[0].open = true
  } else if (e.type === 'mouseleave') {
    skills[0].open = false
  }
}


</script>

<style scoped>

</style>
