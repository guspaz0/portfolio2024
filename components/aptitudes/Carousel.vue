<template>
  <section v-bind:id="el">
    <h2>Aptitudes</h2>
    <div class="carousel-container">
      <div class="carousel">
        <span v-for="skill in aptitudes" :key="skill.id+skill.nombre">
          <Icon v-if="skill.icon" :name="'logos:'+skill.icon" size="2em"/>
          <NuxtImg @contextmenu.prevent=""
                v-else
                :width="50"
                :src="(skill.imagen as string)"
                :alt="skill.nombre"
                loading="lazy"
            />
          <small>{{skill.nombre}}</small>
        </span>
        <span v-for="skill in aptitudes" :key="skill.id + skill.nombre + '-clone'" aria-hidden="true">
          <Icon v-if="skill.icon" :name="'logos:'+skill.icon" size="2em"/>
          <NuxtImg @contextmenu.prevent=""
                v-else
                :width="50"
                :src="(skill.imagen as string)"
                :alt="skill.nombre"
                loading="lazy"
            />
          <small>{{skill.nombre}}</small>
        </span>
      </div>
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
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.carousel-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 35px;
    width: 90%;
    overflow: hidden;
}

.carousel {
    display: flex;
    flex-direction: row;
    gap: 60px;
    white-space: nowrap;
    animation: scroll 30s linear infinite;
}

.carousel:hover {
    animation-play-state: paused;
}

.carousel img {
    width: 50px;
    aspect-ratio: 1/1;
    object-fit: contain;
    filter: drop-shadow(0 0 1px white);
}

.carousel > span {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 70px;
    padding: 5px;
}
</style>
