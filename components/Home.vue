<template>
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
    <Perfiles/>
    <About />
    <Contacto />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Perfil } from '~/server/types/Perfil'
import { useWebsiteStore } from '~/stores/perfiles'
const website = useWebsiteStore()

const { perfiles, currentProfile, darkMode } = website

// Props definition
const props = defineProps({
  perfil: {
    type: Number,
    required: false,
    default: 1
  }
})

// Reactive state
const profile = ref(props.perfil || 1)
const resumeDrive = ref('https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing')
const titulo = ref('Hola! Soy Gustavo Paz ')
const tituloGradient = ref('Desarrollador de Software')
const mensaje = ref('Selecciona un perfil para mostrar informacion pertinente')
const style = ref('overview')
const loginSecuence = ref<string[]>('login'.split(""))
const loginBuffer = ref<string[]>([])

// Methods
const setProfile = (id: number) => {
  //sessionStorage?.setItem('profile', id.toString())
  profile.value = +id
}

// Watchers
watch(profile, (newValue) => {
  // Profile change handler if needed
})

const handleKeyUp = (event: KeyboardEvent) => {
  // Add your secret phrase logic here
  const key = event.key.toLowerCase()
  const updated = [ ...loginBuffer.value, key].slice(-loginSecuence.value.length)
  if (updated.join('') === loginSecuence.value.join('')) {
    navigateTo('/login')
  }
  loginBuffer.value = updated
};

// Clean up event listener on unmount
onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyUp);
});

// Lifecycle hooks
onMounted(async () => {
  document.addEventListener('keyup', handleKeyUp);

  profile.value = +sessionStorage.getItem('profile') as number || props.perfil
})
</script>
