<template>
  <Navbar
    :darkmode="darkmode"
    @setdarkmode="setdarkmode"
    :profileData="profileData"
    :profile="profile"
    @setProfile="setProfile"
  />
  <section class="home container">
    <section id="inicio" class="about">
      <div :class="style">
        <span>
          <p>{{ titulo }}</p>
          <em>{{ tituloGradient }}</em>
        </span>
        <p>{{ mensaje }}</p>
      </div>
    </section>
    <Perfiles :profileData="profileData" :profile="profile" @setProfile="setProfile" />
    <About />
    <Contacto />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Perfil } from '~/server/types/Perfil'

const data = await $fetch('/api/perfiles')

// Props definition
const props = defineProps({
  perfil: {
    type: Number,
    required: false,
    default: 1
  }
})

// Reactive state
const darkmode = ref(false)
const profile = ref(props.perfil || 1)
const profileData = ref<Perfil[]>(data)
const resumeDrive = ref('https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing')
const titulo = ref('Hola! Soy Gustavo Paz ')
const tituloGradient = ref('Desarrollador de Software')
const mensaje = ref('Selecciona un perfil para mostrar informacion pertinente')
const style = ref('overview')
//const cloudurl = ref(vars.cloudurl)

// Methods
const setdarkmode = () => {
  darkmode.value = !darkmode.value
}

const colorSchema = (mode: string) => {
  return window.matchMedia(`(prefers-color-scheme: ${mode})`).matches
}

const setProfile = (id: number) => {
  //sessionStorage?.setItem('profile', id.toString())
  profile.value = +id
}

// Watchers
watch(profile, (newValue) => {
  // Profile change handler if needed
})

watch(darkmode, (val) => {
  const appTheme = document.documentElement
  if (val) {
    appTheme.classList.add('light')
    appTheme.classList.remove('dark')
  } else {
    appTheme.classList.remove('light')
    appTheme.classList.add('dark')
  }
})

// Lifecycle hooks
onMounted(async () => {
  const appTheme = document.documentElement

  if (colorSchema('dark')) {
    darkmode.value = false
    appTheme.classList.remove('light')
    appTheme.classList.add('dark')
  } else {
    darkmode.value = true
    appTheme.classList.remove('light')
    appTheme.classList.add('dark')
  }

  profile.value = +sessionStorage.getItem('profile') as number || props.perfil
})
</script>
