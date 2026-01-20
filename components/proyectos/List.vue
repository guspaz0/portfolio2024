<template>
  <section :id="el">
    <h2>{{ titulo }}</h2>
    <form>
      <fieldset>
        <legend>Filtros</legend>
          <MaterialSelect
            v-model:value="filterTecnologia"
            :options="aptitudes.map(apt => ({ value: apt.id, name: apt.nombre }))"
            :label="'Aptitud'"
            :placeholder="'Seleccionar'"
            :multiple="false"
          />
      </fieldset>
      <small>Mostrando {{ proyectos.length }} de {{ perfil?.proyectos.length }} Proyectos</small>
      <span class="card" @click.prevent="reset">Ver Todos</span>
    </form>

    <div :class="el">
      <p v-if="proyectos.length === 0">No hay proyectos con la Aptitud seleccionada</p>
      <ProyectosItem v-for="proyecto in proyectos" :key="proyecto.id" :proyecto="proyecto" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Aptitud } from '~/server/entities/aptitudes/Aptitudes.entity'
import type { Proyecto } from '~/server/entities/proyectos/Proyectos.entity'
import type { Perfil } from '~/server/types/Perfil'

// Props
const props = defineProps({
  perfil: {
    type: Object as PropType<Perfil>,
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

// Watchers
watch(() => filterTecnologia.value, (val) => {
  if (val !== '') {
    filterTecnologia.value = ''
    proyectos.value = props.perfil?.proyectos?.filter((proyecto: Proyecto) => proyecto.aptitudes?.some(tec => +tec.id === +val)) || [];
  }
})

watch(() => props.perfil, (currentPerfil) => {
  const test = new Map<number,Aptitud>()
  const counter = new Map<number,number>();
  const testFlat = currentPerfil?.proyectos?.flatMap((p: Proyecto) => p.aptitudes) as Aptitud[]

  testFlat?.forEach((apt: Aptitud) => {
    counter.has(apt.id)
      ? counter.set(apt.id, (counter.get(apt.id) as number)+1)
      : counter.set(apt.id, 1)
    test.set(apt.id, {...apt, countProyects: counter.get(apt.id)})
  })

  aptitudes.value = test.values().toArray()

  proyectos.value = currentPerfil?.proyectos?.slice(0, 3) || [];
}, { immediate: true })

</script>

<style scoped>
.proyectos article img {
    width: 50px;
    filter: drop-shadow(3px 3px 4px black);
}

</style>
