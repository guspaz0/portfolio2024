<template>
    <CustomCommandTable 
        :entity="'proyecto'" 
        :create-component="Add" 
        :data="proyectos"
    />
</template>
<script setup lang="ts">
import Add from '~/components/proyectos/Add.vue'

definePageMeta({
    layout: 'dashboard'
})
const store = useWebsiteStore()
await callOnce(store.fetchProyectos)
const { proyectos } = storeToRefs(store)
</script>

<style scoped>
    
</style>