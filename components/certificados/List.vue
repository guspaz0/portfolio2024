<template>
  <section id="certificados" class="section">
    <div class="section-head">
        <div>
            <p class="kicker">// certificados</p>
            <h2>Certificados</h2>
        </div>
    </div>

    <div class="filtros">
        <MaterialSelect
          v-model:value="filterEscuela"
          :options="escuelas.map(esc => ({ name: esc.nombre, value: esc.id }))"
          :label="'Escuela'"
          :placeholder="'Seleccionar'"
          class="filtro"
        />
        <MaterialSelect
          v-model:value="filterTecnologia"
          :options="aptitudes.map(apt => ({ name: apt.nombre, value: apt.id }))"
          :label="'Aptitud'"
          :placeholder="'Seleccionar'"
          class="filtro"
        />
        <small>Mostrando {{ certificados.length }} de {{ perfil?.certificados?.length }} Certificados</small>
        <span class="card" @click.prevent="reset">Ver Todos</span>
    </div>

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

const props = defineProps({
  perfil: {
    type: Object as PropType<Perfil>,
    required: true
  }
})

const certificados = ref<Certificado[]>([])
const escuelas = ref<Escuela[]>([])
const aptitudes = ref<Aptitud[]>([])
const filterEscuela = ref<string>('')
const filterTecnologia = ref<string>('')

const reset = () => {
  filterTecnologia.value = ''
  filterEscuela.value = ''
  certificados.value = props.perfil?.certificados || [];
}

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
  certificados.value = currentPerfil?.certificados?.slice(0, 3) || [];

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

  const uniqueEscuelas = new Map<number,Escuela>()
  const flatEscuelas = (currentPerfil?.certificados?.flatMap((cert) => cert.escuela) || []) as Escuela[];
  flatEscuelas.forEach(esc => uniqueEscuelas.set(esc.id, esc))
  escuelas.value = uniqueEscuelas.values().toArray();
}, { immediate: true })
</script>

<style scoped>
.section-head {
    justify-content: space-between;
    align-items: center;
}

.filtros {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    flex-wrap: wrap;
}

.filtros .filtro {
    flex: 0 1 220px;
    min-width: 180px;
}

.filtros small {
    color: var(--muted);
    font-size: 13px;
    padding-bottom: 10px;
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

.certificados {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    padding: 4px;
}

.certificados > article {
    flex: 1 1 320px;
    max-width: 100%;
}

.certificados > p {
    color: var(--muted);
}
</style>
