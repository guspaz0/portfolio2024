<template>
    <span class="skills" @contextmenu.prevent>
        <!-- <small>{{ aptitud.nombre }}</small> -->
        <Icon 
            :name="'logos:'+aptitud.icon" 
            size="2rem"
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
    padding: 5px;
    min-width: 60px;
    border-radius: 5px;
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