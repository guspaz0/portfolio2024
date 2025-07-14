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
            <span
                v-for="tec in proyecto.aptitudes?.slice(0, 2)"
                :key="tec.id"
                class="skills"
                @contextmenu.prevent
            >
            <small>{{ tec.nombre }}</small>
            <NuxtImg :src="tec.imagen" :alt="tec.nombre" loading="lazy" />
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
                <NuxtImg :src="tec.imagen" :alt="tec.nombre" loading="lazy" />
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
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue';
import type { Proyecto } from '~/server/entities/proyectos/Proyectos.entity'

defineProps({
  proyecto: {
    type: Object as PropType<Proyecto>,
    required: true
  }
});
</script>
