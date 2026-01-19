<template>
    <div>
        <fieldset class="perfiles">
            <legend>Perfiles</legend>
            <span v-for="perfil in perfiles" :key="perfil.id">
                <input
                    type="radio"
                    name="selected"
                    :id="'perfil' + perfil.id"
                    v-model="currentProfile"
                    :value="perfil.id"
                />
                <label :for="'perfil' + perfil.id">{{ perfil.nombre }}</label>
            </span>
        </fieldset>

        <Timeline v-if="currentPerfil?.id" :perfil="currentPerfil" />
        <CertificadosList v-if="currentPerfil?.id" :key="currentPerfil.id" :perfil="currentPerfil" />
        <ProyectosList v-if="currentPerfil?.id" :perfil="currentPerfil" />
        <AptitudesCarousel v-if="currentPerfil?.id" :perfil="currentPerfil" />
    </div>
</template>

<script setup lang="ts">
import type { Perfil } from '~/server/types/Perfil'
const website = useWebsiteStore()

const { perfiles, currentProfile } = storeToRefs(website)

// Reactive data
//const selected = ref(+currentProfile.value)
const currentPerfil = ref<Perfil | null>()

watch(() => currentProfile.value, (perfilId) => {
    currentPerfil.value = perfiles.value.find((perfil) => perfil.id === perfilId) as Perfil
})

//Lifecycle hooks
onMounted(async () => {
    if (perfiles.value.length === 0) {
        await callOnce(website.fetchPerfiles)
        currentPerfil.value = perfiles.value.find((perfil) => perfil.id === (currentProfile.value || 1)) as Perfil
    }
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
