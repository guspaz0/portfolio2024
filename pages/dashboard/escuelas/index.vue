<template>
    <CustomCommandTable 
        :entity="'Escuelas'" 
        :data="escuelas" 
        :createComponent="Add" 
    />
</template>
<script setup lang="ts">
import Add from '~/components/escuelas/Add.vue'
definePageMeta({
    layout: 'dashboard'
})

const store = useWebsiteStore()
await callOnce(store.fetchEscuelas)
const { escuelas } = storeToRefs(store)
</script>

<style scoped>

</style>