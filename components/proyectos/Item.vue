<template>
    <article @contextmenu.prevent>
        <span
            class="img"
            :style="{
                backgroundImage: `linear-gradient(to bottom, rgba(109, 105, 105, 0.655), rgba(109, 105, 105, 0.1)), url(${proyecto.imagen})`
            }"
        >
            <Icon name="line-md:document-code" size="36" color="var(--accent-2)"/>
        </span>
        <h2>{{ proyecto.nombre }}</h2>
        <p>{{ proyecto.descripcion }}</p>
        <div class="tags">
            <AptitudesList
                :key="(proyecto.nombre as string)"
                :aptitudes="proyecto.aptitudes"
                :max="3"
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
                Repositorio →
            </a>
            <a
                v-if="proyecto.deploy"
                :href="proyecto.deploy"
                rel="noreferrer noopener"
                id="deploy"
                target="_blank"
            >
            Ver deploy →
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
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.links {
    display: flex;
    gap: 16px;
    margin-top: auto;
}

.links a {
    font-size: 13px;
    font-weight: 500;
    color: var(--accent-2);
    transition: 200ms;
}

.links a:hover {
    text-decoration: underline;
}
</style>
