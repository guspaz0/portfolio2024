<template>
  <section v-bind:id="el" class="section aptitudes-section">
    <div class="section-head">
        <div>
            <p class="kicker">// aptitudes</p>
            <h2>Herramientas del oficio</h2>
        </div>
        <div class="carousel-nav">
            <button class="nav-btn" @click="scrollBy(-1)" :disabled="atStart" title="Anterior">
                <Icon name="line-md:arrow-left" size="16" color="var(--muted)"/>
            </button>
            <button class="nav-btn" @click="scrollBy(1)" :disabled="atEnd" title="Siguiente">
                <Icon name="line-md:arrow-right" size="16" color="var(--muted)"/>
            </button>
        </div>
    </div>

    <div ref="trackRef" class="aptitudes" @scroll="updateScrollState">
      <span v-for="skill in aptitudes" :key="skill.id+skill.nombre" class="aptitude-item">
        <Icon v-if="skill.icon" :name="'logos:'+skill.icon" size="28" color="var(--accent-2)"/>
        <NuxtImg @contextmenu.prevent=""
              v-else
              :width="28"
              :src="(skill.imagen as string)"
              :alt="skill.nombre"
              loading="lazy"
        />
        <small>{{skill.nombre}}</small>
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'
import type { Perfil } from '~/server/types/Perfil'
import type { Aptitud } from '~/server/entities/aptitudes/Aptitudes.entity'

const props = defineProps({
  perfil: {
    type: Object as PropType<Perfil>,
    required: true
  }
})

const el = ref<string>('aptitudes')
const aptitudes = ref<Aptitud[]>([])
const trackRef = useTemplateRef<HTMLElement>('trackRef')
const atStart = ref(true)
const atEnd = ref(false)

const updateScrollState = () => {
  const el = trackRef.value
  if (!el) return
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}

const scrollBy = (dir: number) => {
  const el = trackRef.value
  if (!el) return
  el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
}

watch(() => props.perfil, (currentPerfil) => {
  const setAptitudes = new Map<string,Aptitud>()
  currentPerfil.aptitudes?.forEach(apt => setAptitudes.set(apt.nombre,apt))
  aptitudes.value = Array.from(setAptitudes.values())
},{immediate:true})

onMounted(updateScrollState)
</script>

<style scoped>
.aptitudes-section {
    overflow: hidden;
}

.section-head {
    justify-content: space-between;
    align-items: center;
}

.carousel-nav {
    display: flex;
    gap: 8px;
}

.nav-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--surface);
    cursor: pointer;
    transition: 200ms;
}

.nav-btn:hover:not(:disabled) {
    border-color: var(--accent);
}

.nav-btn:disabled {
    opacity: 0.35;
    cursor: default;
}

.aptitudes {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 14px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 4px;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    scrollbar-color: var(--line) transparent;
}

.aptitudes::-webkit-scrollbar {
    height: 6px;
}

.aptitudes::-webkit-scrollbar-track {
    background: transparent;
}

.aptitudes::-webkit-scrollbar-thumb {
    background: var(--line);
    border-radius: 3px;
}

.aptitude-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex: 0 0 auto;
    min-width: 110px;
    padding: 16px 18px;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--line);
    scroll-snap-align: start;
}

.aptitude-item small {
    font-size: 13px;
    color: var(--text);
    white-space: nowrap;
}
</style>
