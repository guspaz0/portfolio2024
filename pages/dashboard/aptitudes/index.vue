<template>
    <CustomCommandTable 
        :entity="'aptitud'" 
        :createComponent="Add" 
        :data="aptitudes.map(apt => ({ ...apt, categoria: apt.categoria?.nombre }))"
    />
</template>
<script setup lang="ts">
import Add from '~/components/aptitudes/Add.vue';
definePageMeta({
    layout: 'dashboard'
})

const store = useWebsiteStore()
await callOnce(store.fetchAptitudes)
const { aptitudes } = storeToRefs(store)

</script>

<style scoped>

</style>