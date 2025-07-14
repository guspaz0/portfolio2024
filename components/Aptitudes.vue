<template>
  <section v-bind:id="el">
    <h2>Tecnologías</h2>
    <div className="carousel-container">
      <div className="carousel" v-bind:style="style">
        <span v-for="skill in aptitudes">
          <NuxtImg @contextmenu.prevent=""
               v-if="skill.alt"
               :src="skill.alt"
               :alt="skill.nombre"
               loading="lazy"
            />
          <NuxtImg @contextmenu.prevent=""
               v-else
               :src="skill.imagen"
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
const style = ref<string>('translate:none;rotate:none;scale:none;transform:translateX(0px,0px,0px);')
const carousel = ref<NodeJS.Timeout>(setInterval(() => {}, 10))

function setCarousel(length: number) {
  const anchoCarousel = length * 50 + 60
  var counter = window.visualViewport.width / 2
  carousel.value = setInterval(function() {
    counter--
    if (counter < (anchoCarousel - window.visualViewport.width / 2) * -1) {
      counter = window.visualViewport.width / 2
    }
    let carousel = document.querySelector('.carousel')
    carousel.style.transform = `translate3d(${counter}px,0px,0px)`
  }, 10)
}

watch(() => props.perfil, (currentPerfil) => {
  aptitudes.value = currentPerfil.aptitudes
},{immediate:true})

watch(() => aptitudes.value, () => {
  clearInterval(carousel.value)
  setCarousel(aptitudes.value.length)
},{immediate:true})

</script>

<style scoped>
/* Add your component styles here */
</style>
