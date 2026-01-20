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
const website = useWebsiteStore()
const { perfiles, currentProfile, darkMode } = storeToRefs(website)

// Props definition
const props = defineProps({
  perfil: {
    type: Number,
    required: false,
    default: 1
  }
})

// Reactive state
const titulo = ref('Hola! Soy Gustavo Paz ')
const tituloGradient = ref('Desarrollador de Software')
const mensaje = ref('Selecciona un perfil para mostrar informacion pertinente')
const style = ref('overview')
const loginSecuence = ref<string[]>('login'.split(""))
const loginBuffer = ref<string[]>([])

const handleKeyUp = (event: KeyboardEvent) => {
  // Add your secret phrase logic here
  const key = event.key?.toLowerCase()
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
})
</script>
