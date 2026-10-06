<template>
  <section v-bind:id="el" class="section aptitudes-section">
    <div class="section-head">
        <div>
            <p class="kicker">// aptitudes</p>
            <h2>Herramientas del oficio</h2>
        </div>

    </div>

    <div class="aptitudes">
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

watch(() => props.perfil, (currentPerfil) => {
  const setAptitudes = new Map<string,Aptitud>()
  currentPerfil.aptitudes?.forEach(apt => setAptitudes.set(apt.nombre,apt))
  aptitudes.value = Array.from(setAptitudes.values())
},{immediate:true})
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
    flex-wrap: wrap;
    gap: 14px;
    padding: 4px;
}

.aptitude-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex: 1 1 110px;
    min-width: 0;
    padding: 16px 14px;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--line);
}

.aptitude-item small {
    font-size: 13px;
    color: var(--text);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
}
</style>
