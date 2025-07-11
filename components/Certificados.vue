<template>
  <section id="certificados">
    <h2>{{ titulo }}</h2>
    <form>
      <fieldset>
        <legend>Filtros</legend>
        <label for="filterEsc">Escuela:</label>
        <select id="filterEsc" v-model="filterEscuela">
          <option v-for="esc in escuelas" :key="esc.id" :value="esc.id">
            {{ esc.nombre }}
          </option>
        </select>
        <label for="filterTec">Aptitud:</label>
        <select id="filterTec" v-model="filterTecnologia">
          <option v-for="tec in aptitudes" :key="tec.id" :value="tec.id">
            {{ tec.nombre }} ({{ tec.countCertificados }})
          </option>
        </select>
      </fieldset>
      <small>Mostrando {{ certificados.length }} de {{ perfil?.certificados.length }} Certificados</small>
      <span class="card" @click.prevent="reset">Ver Todos</span>
    </form>

    <div class="certificados">
      <p v-if="certificados.length === 0">No hay certificados con la Escuela/Aptitud seleccionada</p>
      <article v-for="cert in certificados" :key="cert.id" @contextmenu.prevent>
        <b>{{ cert.nombre }}</b>
        <span>
          <img
            :src="cert?.escuela.image"
            :alt="cert?.escuela.nombre"
            format="webp"
            loading="lazy" />
        </span>
        <b>Tecnologias:</b>
        <div class="proyectos">
          <span
            v-for="tec in cert.aptitudes.slice(0, 2)"
            :key="tec.id"
            class="skills"
            @contextmenu.prevent
          >
            <small>{{ tec.nombre }}</small>
            <img
                :src="tec.image"
                :alt="tec.nombre"
                format="webp"
                loading="lazy"
            />
          </span>
          <span
            v-if="cert?.aptitudes.length > 2"
            class="skills"
            @mouseenter="showAptitudes"
            @contextmenu.prevent
          >
            <b>+{{ cert.aptitudes.length - 2 }}</b>
          </span>
          <dialog
            v-if="cert.aptitudes.length > 3"
            @mouseleave="showAptitudes"
            @contextmenu.prevent
          >
            <span v-for="tec in cert.aptitudes" :key="tec.id" class="skills">
              <small>{{ tec.nombre }}</small>
              <img
                :src="tec.path"
                :alt="tec.nombre"
                format="webp"
                loading="lazy" />
            </span>
          </dialog>
        </div>
        <a
          v-if="cert.path"
          :href="cert.path"
          rel="noreferrer noopener"
          target="_blank"
        >
          Certificado
        </a>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  perfil: {
    //type: Object,
    required: true,
    default: async () => await $fetch(`/api/perfiles/1`)
  }
})

// Reactive state
const titulo = ref('Certificados')
const certificados = ref([])
const escuelas = ref([])
const aptitudes = ref([])
const filterEscuela = ref('')
const filterTecnologia = ref('')

// Methods
const reset = () => {
  filterTecnologia.value = ''
  filterEscuela.value = ''
  certificados.value = props.perfil?.certificados || [];
}

const showAptitudes = (e) => {
  const skills = Array.from(e.target.parentNode.childNodes)
    .filter(s => s.tagName === 'DIALOG')

  if (e.type === 'mouseenter') {
    skills[0].open = true
  } else if (e.type === 'mouseleave') {
    skills[0].open = false
  }
}

// Watchers
watch(filterEscuela, (val) => {
  if (val !== '') {
    filterTecnologia.value = ''
    certificados.value = props.perfil?.certificados
      .filter(cert => +cert.escuela.id === +val) || [];
  }
})

watch(filterTecnologia, (val) => {
  if (val !== '') {
    filterEscuela.value = ''
    certificados.value = props.perfil?.certificados
      .filter(cert => cert.aptitudes.some(tec => tec.id === +val)) || [];
  }
})

watch(() => props.perfil, (currentPerfil) => {
  // Initialize certificados with first 3 items
  certificados.value = currentPerfil?.certificados.slice(0, 3) || [];

  // Filter aptitudes based on certificates
  aptitudes.value = currentPerfil?.aptitudes
    .filter(apt => currentPerfil?.certificados
      .some(cert => cert.aptitudes
        .some(tec => tec.id === apt.id))) || []

  // Get unique schools
  escuelas.value = currentPerfil?.certificados.flatMap((cert) => cert.escuela) || [];
}, { immediate: true })
</script>

<style scoped>
/* Add your styles here if needed */

</style>
