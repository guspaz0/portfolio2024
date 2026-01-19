<template>
    <article @contextmenu.prevent>
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
            <AptitudesList
                :key="(proyecto.nombre as string)" 
                :aptitudes="proyecto.aptitudes"
                :max="2"
            />
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
</template>

<script setup lang="ts">
import type { Proyecto } from '~/server/entities/proyectos/Proyectos.entity'

defineProps({
  proyecto: {
    type: Object as PropType<Proyecto>,
    required: true
  }
});



</script>

<style scoped>
.proyectos .skills {
    filter: none;
    mask-image: none;
    background-color: rgba(5,5,5, 0.1);
    padding: 5px;
    min-width: 60px;
    border-radius: 5px;
}
</style>