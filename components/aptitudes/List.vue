<template>
    <AptitudesItem v-for="tec in aptitudes?.slice(0, max)" 
        :key="tec.id" 
        :aptitud="tec"
    />
    <span v-if="aptitudes.length > max" 
        @mouseenter.prevent="showAptitudes" 
        @contextmenu.prevent=""
    >
        <b>+{{ aptitudes.length - max }}</b>
    </span>
    <dialog v-if="(aptitudes?.length as number) > max+1" 
        @mouseleave.prevent="showAptitudes" 
        @contextmenu.prevent=""
    >
        <span v-for="tec in aptitudes" :key="tec.id" class="skills">
            <Icon 
                :name="'logos:'+tec.icon" 
                size="2rem"
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
.aptitudes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items:center;
    justify-content: space-between;
    border-radius: 5px;
    gap: 7px;
    transition: 250ms;
}

.skills {
    filter: none;
    mask-image: none;
    padding: 5px;
    min-width: 60px;
    border-radius: 5px;
}

article .skills {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
}

span.skills:hover {
    color: black;
}

span.skills span.iconify {
    max-width: 50px;
    max-height: 50px;
    transition: 500ms;
}
span.skills:hover span.iconify {
    display: block;
    position: absolute;
    z-index: 50;
}
dialog {
    transition: 500ms;
}

dialog:hover {
    position: absolute;
}

dialog[open] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    bottom: -5px;
    z-index: 15;
    filter: drop-shadow(3px 3px 4px black);
    border: none;
    gap: 3px;
    padding: 2px;
    border-radius: 5px;
}
</style>