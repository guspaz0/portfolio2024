<template>
  <section id="timeline" class="section">
    <div class="orb orb-exp"></div>
    <div class="section-head">
        <div>
            <p class="kicker">// experiencia</p>
            <h2>Trayectoria</h2>
        </div>
    </div>

    <ol v-if="linea.length > 0" class="timeline">
      <li v-for="elem in linea" :key="elem.id">
        <div>
          <div class="dot"></div>
          <div class="body">
            <time>{{ formatPeriod(elem) }}</time>
            <h3>{{ elem.nombre }}</h3>
            <h4 v-if="elem.empresa">{{ elem.empresa }}</h4>
            <p>{{ elem.descripcion }}</p>
          </div>
        </div>
      </li>
    </ol>
    <p v-else class="empty">No hay experiencias disponibles para {{ perfil?.nombre }}</p>
    <small>Solo hago mención a mis hitos en tecnología</small>
  </section>
</template>

<script setup lang="ts">
import type { Experiencia } from '~/server/entities/experiencias/Experiencias.entity'
import type { Perfil } from '~/server/types/Perfil'

const props = defineProps({
  perfil: {
    type: Object as PropType<Perfil>,
    required: true
  }
})

const linea = ref<Experiencia[]>([])

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString([], {
    month: '2-digit',
    year: 'numeric'
  })
}

const formatPeriod = (elem: Experiencia) => {
  const start = elem.fecha ? new Date(elem.fecha).getFullYear() : ''
  const end = elem.fechaFin ? new Date(elem.fechaFin).getFullYear() : 'Hoy'
  return `${start} — ${end}`
}

watch(() => props.perfil, (currentPerfil) => {
  linea.value = currentPerfil?.experiencias || []
}, { immediate: true })
</script>

<style scoped>
.timeline {
    border-left: 2px solid var(--line);
    list-style: none;
    margin: 0;
    padding: 4px 0 4px 28px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 900px;
}

.timeline > li {
    position: relative;
}

.timeline .dot {
    position: absolute;
    left: -35px;
    top: 6px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-image: var(--theme-em-gradient-pink);
    box-shadow: 0 0 10px rgba(139, 124, 255, 0.6);
}

.timeline .body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 0;
}

.timeline time {
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    color: var(--accent-2);
}

.timeline h3 {
    font-family: "Space Grotesk", sans-serif;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
}

.timeline h4 {
    font-size: 14px;
    font-weight: 400;
    color: var(--muted);
    margin: 0;
}

.timeline p {
    max-width: 640px;
    font-size: 14px;
    line-height: 1.55;
    color: var(--muted);
}

.empty {
    color: var(--muted);
}

small {
    color: var(--muted);
}

.orb-exp {
    top: -40px;
    right: -120px;
    width: 420px;
    height: 420px;
    background: var(--accent);
    opacity: 0.1;
}
</style>
