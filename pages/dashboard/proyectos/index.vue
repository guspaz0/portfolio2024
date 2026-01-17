<template>
    <CommandTable 
        :entity="'proyecto'" 
        :create-component="AddProyecto" 
        :data="proyectos"
    />
</template>
<script setup lang="ts">
import CommandTable from '~/components/composables/CommandTable.vue';
import AddProyecto from '~/components/proyectos/AddProyecto.vue';
import { useWebsiteStore } from '~/stores/perfiles'
definePageMeta({
    layout: 'dashboard'
})
const store = useWebsiteStore()
await callOnce(store.fetchProyectos)
const { proyectos } = storeToRefs(store)
</script>

<style scoped>
    
</style>