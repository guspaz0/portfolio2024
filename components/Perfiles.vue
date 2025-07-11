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

        <Timeline :perfil="currentPerfil" />
        <Certificados :perfil="currentPerfil" />
        <Proyectos :perfil="currentPerfil" />
        <!-- <AptitudesComponent :perfil="currentPerfil" /> -->
    </div>
</template>

<script setup lang="ts">

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
const perfiles = ref([])
const selected = ref(+props.profile)
const currentPerfil = ref(null)

// Methods
const loadPerfiles = async () => {
    // Replace with your actual service call
    const perfilesTodos = await $fetch('/api/perfiles')

    perfiles.value = perfilesTodos;

    // Set initial perfil
    updateCurrentPerfil(selected.value)
}

const updateCurrentPerfil = async (profileId) => {
    const foundPerfil = await $fetch(`/api/perfiles/${profileId}`)
    console.log(foundPerfil)
    if (foundPerfil) {
        currentPerfil.value = foundPerfil
    }
}

// Watchers
watch(() => props.profile, (newValue) => {
    selected.value = +newValue
    updateCurrentPerfil(newValue)
})

watch(selected, (newValue) => {
    emit('setProfile', +newValue)
    updateCurrentPerfil(newValue)
})

// Lifecycle hooks
onMounted(() => {
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
