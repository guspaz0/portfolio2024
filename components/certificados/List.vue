<template>
  <section id="certificados">
    <h2>{{ titulo }}</h2>
    <form>
      <fieldset>
        <legend>Filtros</legend>
        <MaterialSelect
          v-model:value="filterEscuela"
          :options="escuelas.map(esc => ({ name: esc.nombre, value: esc.id }))"
          :label="'Escuela'"
          :placeholder="'Seleccionar'"
        />
        <MaterialSelect
          v-model:value="filterTecnologia"
          :options="aptitudes.map(apt => ({ name: apt.nombre, value: apt.id }))"
          :label="'Aptitud'"
          :placeholder="'Seleccionar'"
        />
      </fieldset>
      <small>Mostrando {{ certificados.length }} de {{ perfil?.certificados?.length }} Certificados</small>
      <span class="card" @click.prevent="reset">Ver Todos</span>
    </form>

    <div class="certificados">
      <p v-if="certificados.length === 0">No hay certificados con la Escuela/Aptitud seleccionada</p>
      <CertificadosItem v-for="cert in certificados" :key="cert.id" :cert="cert" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Aptitud } from '~/server/entities/aptitudes/Aptitudes.entity'
import type { Certificado } from '~/server/entities/certificados/Certificados.entity'
import type { Escuela } from '~/server/entities/escuelas/Escuelas.entity'
import type { Perfil } from '~/server/types/Perfil'
const CertificadoComp = resolveComponent('certificados/CertificadoComp')

// Props
const props = defineProps({
  perfil: {
    type: Object as PropType<Perfil>,
    required: true
  }
})

// Reactive state
const titulo = ref('Certificados')
const certificados = ref<Certificado[]>([])
const escuelas = ref<Escuela[]>([])
const aptitudes = ref<Aptitud[]>([])
const filterEscuela = ref<string>('')
const filterTecnologia = ref<string>('')

// Methods
const reset = () => {
  filterTecnologia.value = ''
  filterEscuela.value = ''
  certificados.value = props.perfil?.certificados || [];
}


// Watchers
watch(filterEscuela, (val) => {
  if (val !== '') {
    filterTecnologia.value = ''
    certificados.value = props.perfil?.certificados?.filter(cert => +cert.escuela?.id === +val) || [];
  }
})

watch(filterTecnologia, (val) => {
  if (val !== '') {
    filterEscuela.value = ''
    certificados.value = props.perfil?.certificados?.filter(cert => cert.aptitudes?.some(tec => tec.id === +val)) || [];
  }
})

watch(() => props.perfil, (currentPerfil) => {
  reset()
  // Initialize certificados with first 3 items
  certificados.value = currentPerfil?.certificados?.slice(0, 3) || [];

  // Filter aptitudes based on certificates
  const uniqueAptitudes = new Map<number,Aptitud>()
  const counter = new Map<number,number>();
  const flatAptitudes = (currentPerfil?.certificados?.flatMap(cert => cert.aptitudes) || []) as Aptitud[]
  flatAptitudes.forEach(apt => {
    counter.has(apt.id)
      ? counter.set(apt.id, (counter.get(apt.id) as number) +1)
      : counter.set(apt.id, 1)
    uniqueAptitudes.set(apt.id, { ...apt, countCertificados: counter.get(apt.id) })
  })
  aptitudes.value = uniqueAptitudes.values().toArray()

  // Get unique schools
  const uniqueEscuelas = new Map<number,Escuela>()
  const flatEscuelas = (currentPerfil?.certificados?.flatMap((cert) => cert.escuela) || []) as Escuela[];
  flatEscuelas.forEach(esc => uniqueEscuelas.set(esc.id, esc))
  escuelas.value = uniqueEscuelas.values().toArray();
}, { immediate: true })
</script>

<style scoped>

.certificados {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
}

.certificados img, #certificados img {
    width: 150px;
    filter: drop-shadow(0 0 1px white);
}

.certificados fieldset {
  display: flex;
  flex-direction: row;
}
</style>
