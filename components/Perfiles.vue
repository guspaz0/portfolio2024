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

        <TimelineComponent :perfil="currentPerfil" />
        <CertificadosComponent :perfil="currentPerfil" />
        <ProyectosComponent :perfil="currentPerfil" />
        <AptitudesComponent :perfil="currentPerfil" />
    </div>
</template>

<script setup>
// Import your services and components (you'll need to convert these to ESM)
// import { findAll } from '~/services/Perfiles.js'
// These components will be auto-imported by Nuxt.js if placed in components/ folder

// Props
const props = defineProps({
    profile: {
        type: [Number, String],
        default: 1
    }
})

// Emits
const emit = defineEmits(['setProfile'])

// Reactive data
const perfiles = ref([])
const selected = ref(+props.profile)
const currentPerfil = ref(null)

// Mock data - replace with your actual service
const mockPerfiles = [
    { id: 1, nombre: 'Desarrollador Frontend' },
    { id: 2, nombre: 'Desarrollador Backend' },
    { id: 3, nombre: 'Desarrollador Full Stack' }
]

// Methods
const loadPerfiles = () => {
    // Replace with your actual service call
    // perfiles.value = findAll()
    perfiles.value = mockPerfiles
    
    // Set initial perfil
    updateCurrentPerfil(selected.value)
}

const updateCurrentPerfil = (profileId) => {
    const foundPerfil = perfiles.value.find(perfil => perfil.id === +profileId)
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