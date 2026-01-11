<template>
    <CommandTable :entity="'proyecto'" :createComponent="AddProyecto" :data="proyectos"/>
</template>
<script setup land="ts">
definePageMeta({
    layout: 'dashboard'
})
import CommandTable from '~/components/customComponents/CommandTable.vue';
import AddProyecto from '~/components/proyectos/AddProyecto.vue';
import { useWebsiteStore } from '~/stores/perfiles'
const store = useWebsiteStore()
await callOnce(store.fetchProyectos)
const { proyectos } = storeToRefs(store)
</script>

<styles>
    
</styles>