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
      <article v-for="proyecto in proyectos" :key="proyecto.id" @contextmenu.prevent>
        <span
          class="img"
          :style="{
            backgroundImage: `linear-gradient(to bottom, rgba(109, 105, 105, 0.655), rgba(109, 105, 105, 0.1)), url(${proyecto.imagen})`
          }"
        />
        <h2>{{ proyecto.nombre }}</h2>
        <p>{{ proyecto.descripcion }}</p>
        <b>Tecnologias:</b>
        <div class="proyectos">
          <span
            v-for="tec in proyecto.aptitudes?.slice(0, 2)"
            :key="tec.id"
            class="skills"
            @contextmenu.prevent
          >
            <small>{{ tec.nombre }}</small>
            <img :src="tec.path" :alt="tec.nombre" loading="lazy" />
          </span>
          <span
            v-if="proyecto.aptitudes?.length > 2"
            class="expand"
            @mouseenter="showAptitudes"
            @contextmenu.prevent
          >
            <b>+{{ proyecto.aptitudes?.length - 2 }}</b>
          </span>
          <dialog
            v-if="proyecto.aptitudes?.length > 3"
            @mouseleave="showAptitudes"
            @contextmenu.prevent
          >
            <span v-for="tec in proyecto.aptitudes" :key="tec.id" class="skills">
              <small>{{ tec.nombre }}</small>
              <img :src="tec.path" :alt="tec.nombre" loading="lazy" />
            </span>
          </dialog>
        </div>
        <span class="links" @contextmenu.prevent>
          <a
            v-if="proyecto.repositorio"
            :href="proyecto.repositorio"
            rel="noreferrer noopener"
            id="repo"
            target="_blank"
          >
            Repositorio
          </a>
          <a
            v-if="proyecto.deploy"
            :href="proyecto.deploy"
            rel="noreferrer noopener"
            id="deploy"
            target="_blank"
          >
            Link Deploy
          </a>
        </span>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// Types
interface Aptitud {
  id: number
  nombre: string
  path: string
  countProyects: number
}

interface Proyecto {
  id: number
  nombre: string
  descripcion: string
  imagen: string
  repositorio?: string
  deploy?: string
  aptitudes: Aptitud[]
}

// Props
const props = defineProps({
  perfil: {
    //type: Object,
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
