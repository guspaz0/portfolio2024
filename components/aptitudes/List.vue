<template>
    <AptitudesItem v-for="tec in aptitudes?.slice(0, max)"
        :key="tec.id"
        :aptitud="tec"
    />
    <span v-if="aptitudes.length > max"
        @mouseenter.prevent="showAptitudes"
        @contextmenu.prevent=""
        class="more"
    >
        +{{ aptitudes.length - max }}
    </span>
    <dialog v-if="(aptitudes?.length as number) > max+1"
        @mouseleave.prevent="showAptitudes"
        @contextmenu.prevent=""
    >
        <span v-for="tec in aptitudes" :key="tec.id" class="skills">
            <Icon
                :name="'logos:'+tec.icon"
                size="1.5rem"
            />
        </span>
    </dialog>
</template>

<script setup lang="ts">
import type { Aptitud } from '~/server/entities/aptitudes/Aptitudes.entity';

defineProps({
    aptitudes: {
        type: Object as PropType<Aptitud[]>,
        required: true
    },
    max: {
        type: Number,
        required: true
    }
})

const showAptitudes = (e: MouseEvent) => {
    e.stopPropagation()
    const skills = Array.from(e.target?.parentNode?.childNodes)
        .filter(s => s.tagName === "DIALOG") as HTMLDialogElement[]
    if (e.type === "mouseenter") {
        skills[0].open = true
    } else if (e.type === "mouseleave") {
        skills[0].open = false
    }
}

</script>

<style scoped>
.more {
    display: inline-flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 6px;
    background: var(--surface-2);
    border: 1px solid var(--line);
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    color: var(--muted);
    cursor: pointer;
}

dialog[open] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid var(--line);
    background: var(--ink);
    color: var(--text);
}
</style>
