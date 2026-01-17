<template>
    <CommandTable :entity="'Escuelas'" :data="escuelas" :createComponent="AddEscuela" />
</template>
<script setup land="ts">
definePageMeta({
    layout: 'dashboard'
})
import AddEscuela from '~/components/escuelas/AddEscuela.vue'
import CommandTable from '~/components/composables/CommandTable.vue'
import { useWebsiteStore } from '~/stores/perfiles'
const store = useWebsiteStore()
await callOnce(store.fetchEscuelas)
const { escuelas } = storeToRefs(store)
</script>

<style scoped>

</style>