<template>
    <span class="skills" @contextmenu.prevent>
        <small>{{ aptitud.nombre }}</small>
        <NuxtImg 
            :src="(aptitud.imagen as string)" 
            :alt="aptitud.nombre"
            loading="lazy" 
        />
    </span>
</template>

<script setup lang="ts">
import { Aptitud } from '~/server/entities/aptitudes/Aptitudes.entity';

defineProps({
    aptitud: {
        type: Object as PropType<Aptitud>,
        required: true
    }
})

</script>

<style scoped>
.skills {
    filter: none;
    mask-image: none;
    background-color: rgba(5,5,5, 0.1);
    padding: 5px;
    min-width: 60px;
    border-radius: 5px;
}
span.skills:hover {
    background-color: rgba(5,5,5, 0.2);
    color: black;
}
span.skills small:hover{
    position: absolute;
    z-index: 50;
}
span.skills img {
    display: none;
    max-width: 50px;
    max-height: 50px;
    transition: 500ms;
}
span.skills:hover img {
    display: block;
    position: absolute;
    z-index: 50;
}
</style>