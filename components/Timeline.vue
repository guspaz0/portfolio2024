<template>
  <section id="timeline" class="timeline-container">
    <h2>{{ titulo }}</h2>
    <ol v-if="linea.length > 0" class="timeline">
      <li v-for="elem in linea" :key="elem.id">
        <div>
          <div class="dot"></div>
          <div>
            <h3>{{ elem.nombre }}</h3>
            <span>
              <NuxtImg
                v-if="elem.imagen"
                :src="elem.imagen"
                :alt="elem.empresa"
              />
              <h4 v-if="elem.empresa">{{ elem.empresa }}</h4>
            </span>
            <time>
              {{ formatDate(elem.fecha) }}
              - {{ elem.fechaFin ? formatDate(elem.fechaFin) : '' }}
              (
              <b v-if="elem.duracion.años > 0">
                {{ elem.duracion.años }} {{ elem.duracion.años > 1 ? 'años ' : 'año ' }}
              </b>
              <b v-if="elem.duracion.años > 0 && elem.duracion.meses > 0"> y </b>
              <b v-if="elem.duracion.meses > 0">
                {{ elem.duracion.meses }} {{ elem.duracion.meses > 1 ? 'meses ' : 'mes ' }}
              </b>
              )
            </time>
          </div>
          <p>{{ elem.descripcion }}</p>
        </div>
      </li>
    </ol>
    <p v-else>No hay experiencias disponibles para {{ perfil?.nombre }}</p>
    <small>Solo hago mencion a mis hitos en tecnologia</small>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Props definition
const props = defineProps({
  perfil: {
    //type: Object,
    required: true,
    default: {experiencias:[]}
  }
})

// Reactive state
const titulo = ref('Experiencia')
const linea = ref([])

// Date formatter
const formatDate = (date) => {
  return new Date(date).toLocaleDateString([], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Watch for perfil changes
watch(() => props.perfil, (currentPerfil) => {
  linea.value = currentPerfil?.experiencias || []
}, { immediate: true })
</script>

<style scoped>
/* Add your existing styles here if any */
.timeline span img {
    max-height: 50px;
    filter: drop-shadow(0 0 1px white) contrast(2);
}
.timeline {
    position: relative;
    max-width: 600px;
}

ol.timeline {
    border-left: solid 3px var(--text-color);
    list-style: none;
    padding: 20px;
}

ol > li > div > div.dot {
    position: absolute;
    left: -7px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-image: var(--theme-em-gradient-pink);
}
.timeline-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
</style>
