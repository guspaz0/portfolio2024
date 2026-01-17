<template>
    <CommandTable 
        :entity="'aptitud'" 
        :createComponent="AddAptitud" 
        :data="aptitudes.map(apt => ({ ...apt, categoria: apt.categoria?.nombre }))"
    />
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})
import AddAptitud from '~/components/aptitudes/AddAptitud.vue';
import CommandTable from '~/components/composables/CommandTable.vue';
import { useWebsiteStore } from '~/stores/perfiles'
const store = useWebsiteStore()
await callOnce(store.fetchAptitudes)
const { aptitudes } = storeToRefs(store)

</script>

<style scoped>

</style>