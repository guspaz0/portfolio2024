<template>
  <section :id="el" class="section">
    <div class="section-head">
        <div>
            <p class="kicker">// proyectos</p>
            <h2>Trabajo seleccionado</h2>
        </div>
        <a class="proj-link" href="https://github.com/guspaz0?tab=repositories" target="_blank" rel="noopener noreferrer">
            Ver todos →
        </a>
    </div>

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

const props = defineProps({
  perfil: {
    type: Object as PropType<Perfil>,
    required: true,
    default: {}
  }
})

const el = ref('proyectos')
const proyectos = ref<Proyecto[]>([])
const aptitudes = ref<Aptitud[]>([])
const filterTecnologia = ref('')

const reset = () => {
  filterTecnologia.value = ''
  proyectos.value = props.perfil?.proyectos || [];
}

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
.section-head {
    justify-content: space-between;
    align-items: center;
}

.proj-link {
    font-size: 14px;
    color: var(--muted);
    transition: 200ms;
}

.proj-link:hover {
    color: var(--accent-2);
}

form {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

form fieldset {
    display: flex;
    align-items: center;
    gap: 10px;
}

form small {
    color: var(--muted);
    font-size: 13px;
}

.card {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: var(--surface);
    font-size: 13px;
    cursor: pointer;
    transition: 200ms;
}

.card:hover {
    border-color: var(--accent);
    color: var(--accent);
}

.proyectos {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.proyectos > p {
    color: var(--muted);
}
</style>
