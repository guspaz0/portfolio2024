<template>
  <section :id="el">
    <h2>{{ titulo }}</h2>
    <form>
      <fieldset>
        <legend>Filtros</legend>
        <label for="filterTec">Aptitud:</label>
        <select id="filterTec" v-model="filterTecnologia">
          <option v-for="tec in aptitudes" :key="tec.id" :value="tec.id">
            {{ tec.nombre }} ({{ tec.countProyects }})
          </option>
        </select>
      </fieldset>
      <small>Mostrando {{ proyectos.length }} de {{ perfil?.proyectos.length }} Proyectos</small>
      <span class="card" @click.prevent="reset">Ver Todos</span>
    </form>

    <div :class="el">
      <p v-if="proyectos.length === 0">No hay proyectos con la Aptitud seleccionada</p>
      <ProyectoComp v-for="proyecto in proyectos" :key="proyecto.id" :proyecto="proyecto" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Aptitud } from '~/server/entities/aptitudes/Aptitudes.entity'
import type { Proyecto } from '~/server/entities/proyectos/Proyectos.entity'
const ProyectoComp = resolveComponent('proyectos/ProyectoComp')

// Props
const props = defineProps({
  perfil: {
    type: Object,
    required: true,
    default: {}
  }
})

// Reactive state
const titulo = ref('Proyectos')
const el = ref('proyectos')
const proyectos = ref<Proyecto[]>([])
const aptitudes = ref<Aptitud[]>([])
const filterTecnologia = ref('')

// Methods
const reset = () => {
  filterTecnologia.value = ''
  proyectos.value = props.perfil?.proyectos || [];
}

const showAptitudes = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const skills = Array.from(target.parentNode?.childNodes ?? [])?.filter(s => (s as HTMLElement).tagName === 'DIALOG')

  if (e.type === 'mouseenter') {
    (skills[0] as HTMLDialogElement).open = true
  } else if (e.type === 'mouseleave') {
    (skills[0] as HTMLDialogElement).open = false
  }
}

// Watchers
watch(filterTecnologia, (val) => {
  if (val !== '') {
    filterTecnologia.value = ''
    proyectos.value = props.perfil?.proyectos?.filter(proyecto => proyecto.aptitudes?.some(tec => +tec.id === +val)) || [];
  }
})

watch(() => props.perfil, (currentPerfil) => {
  aptitudes.value = currentPerfil?.aptitudes?.filter(apt => currentPerfil.proyectos
      .some(proyecto => proyecto.aptitudes?.some(prApt => prApt.id === apt.id))) || [];

  proyectos.value = currentPerfil?.proyectos?.slice(0, 3) || [];
}, { immediate: true })
onMounted(() => {
  // if (!props.perfil) {
  //   props.perfil = async ()=> $fetch('/api/perfiles/1')
  // }
})
</script>

<style scoped>
/* Add your styles here if needed */

</style>
