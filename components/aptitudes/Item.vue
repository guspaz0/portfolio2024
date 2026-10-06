<template>
    <span class="tag" @contextmenu.prevent :title="aptitud.nombre">
        <Icon
            :name="'logos:'+aptitud.icon"
            size="14"
            color="var(--accent-2)"
        />
        {{ aptitud.nombre }}
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
.tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 6px;
    background: var(--surface-2);
    border: 1px solid var(--line);
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    color: var(--muted);
}
</style>
