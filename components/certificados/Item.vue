<template>
    <article @contextmenu.prevent>
    <b>{{ cert.nombre }}</b>
    <span>
        <NuxtImg
        :src="(cert?.escuela?.imagen as string)"
        :alt="cert?.escuela?.nombre"
        format="webp"
        loading="lazy" />
    </span>
    <b>Tecnologias:</b>
    <div class="proyectos">
      <AptitudesList 
        :key="(cert.nombre as string)" 
        :aptitudes="cert.aptitudes"
        :max="2"
      />
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

defineProps({
  cert: {
    type: Object as PropType<Certificado>,
    required: true
  }
})

</script>

<style scoped>
article {
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    min-height: 250px;
    justify-content: space-between;
    width: 310px;
}

article img {
  max-width: 150px;

}

.proyectos .skills {
    filter: none;
    mask-image: none;
    background-color: rgba(5,5,5, 0.1);
    padding: 5px;
    min-width: 60px;
    border-radius: 5px;
}
.proyectos {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
}
</style>
