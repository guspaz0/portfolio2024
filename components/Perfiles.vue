<template>
    <div class="perfiles-section">
        <fieldset class="perfiles">
            <legend>// perfiles</legend>
            <div class="perfil-options">
                <span v-for="perfil in perfiles" :key="perfil.id" class="perfil-option">
                    <input
                        type="radio"
                        name="selected"
                        :id="'perfil' + perfil.id"
                        v-model="currentProfile"
                        :value="perfil.id"
                    />
                    <label :for="'perfil' + perfil.id">{{ perfil.nombre }}</label>
                </span>
            </div>
        </fieldset>

        <Timeline v-if="currentPerfil?.id" :perfil="currentPerfil" />
        <CertificadosList v-if="currentPerfil?.id" :key="currentPerfil.id" :perfil="currentPerfil" />
        <ProyectosList v-if="currentPerfil?.id" :perfil="currentPerfil" />
        <AptitudesCarousel v-if="currentPerfil?.id" :perfil="currentPerfil" />
        <GithubInsights
            :username="'guspaz0'"
            :count="5"
        />
    </div>
</template>

<script setup lang="ts">
import type { Perfil } from '~/server/types/Perfil'
const website = useWebsiteStore()

const { perfiles, currentProfile } = storeToRefs(website)

const currentPerfil = computed<Perfil | null>(() => {
    return perfiles.value.find((perfil) => perfil.id === currentProfile.value) || null
})

onMounted(async () => {
    if (perfiles.value.length === 0) {
        await callOnce(website.fetchPerfiles)
    }
})
</script>

<style scoped>
.perfiles-section {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 40px 56px;
    max-width: 1440px;
    margin: 0 auto;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-left: none;
    border-right: none;
}

@media (max-width: 700px) {
    .perfiles-section {
        padding: 0 24px;
    }
}
</style>
