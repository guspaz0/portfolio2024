<template>
    <div>
        <fieldset class="perfiles">
            <legend>Perfiles</legend>
            <span v-for="perfil in perfiles" :key="perfil.id">
                <input
                    type="radio"
                    name="selected"
                    :id="'perfil' + perfil.id"
                    v-model="selected"
                    :value="perfil.id"
                />
                <label :for="'perfil' + perfil.id">{{ perfil.nombre }}</label>
            </span>
        </fieldset>

        <Timeline v-if="currentPerfil?.id" :perfil="currentPerfil" />
        <Certificados v-if="currentPerfil?.id" :key="currentPerfil.id" :perfil="currentPerfil" />
        <Proyectos v-if="currentPerfil?.id" :perfil="currentPerfil" />
        <AptitudesCarousel v-if="currentPerfil?.id" :perfil="currentPerfil" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeMount } from 'vue'
import type { Perfil } from '~/server/types/Perfil'

// Props
const props = defineProps({
    profile: {
        type: Number,
        default: 1
    }
})

// Emits
const emit = defineEmits(['setProfile'])

// Reactive data
const perfiles = ref<Perfil[]>([])
const selected = ref(+props.profile)
const currentPerfil = ref<Perfil>()

// Methods
const loadPerfiles = async () => {
    // Replace with your actual service call
    const perfilesTodos = await $fetch('/api/perfiles') as Perfil[]

    perfiles.value = perfilesTodos || [];

    // Set initial perfil
    //updateCurrentPerfil(selected.value)
    currentPerfil.value = perfilesTodos.find((perfil) => perfil.id === selected.value)
}

const updateCurrentPerfil = async (profileId: number) => {
    const foundPerfil = await $fetch(`/api/perfiles/${profileId}`) as Perfil
    if (foundPerfil) {
        currentPerfil.value = foundPerfil
    }
}

// Watchers
watch(() => props.profile, (newValue: number) => {
    selected.value = +newValue
    updateCurrentPerfil(newValue)
}, { immediate: true })

watch(() => selected.value, (newValue: number) => {
    emit('setProfile', +newValue)
    updateCurrentPerfil(newValue)
}, { immediate: true })

// Lifecycle hooks
onBeforeMount(() => {
    loadPerfiles()
})
</script>

<style scoped>

fieldset.perfiles {
    position: relative;
    transform: translate(-50%,0%);
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-color: var(--text-color);
    max-width: 750px;
}

fieldset.perfiles label {
    position: relative;
    color: var(--text-color);
    font-size: 20px;
    border: 2px solid var(--text-color);
    border-radius: 5px;
    padding: 10px 50px;
    display: flex;
    align-items: center;
    transition: 400ms;
}

fieldset.perfiles input[type="radio"]:checked + label {
    background-color: var(--text-color);
    color: var(--bg-color);
}

fieldset.perfiles input[type="radio"]:checked + label:before {
    height: 10px;
    width: 10px;
    border: 6px solid var(--bg-color);
    background-color: var(--text-color);
}
</style>
