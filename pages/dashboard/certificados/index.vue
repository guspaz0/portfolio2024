<template>
    <CommandTable :entity="'certificado'" :createComponent="AddCertificado" :data="certificados"/>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})
import AddCertificado from '~/components/certificados/addCertificado.vue';
import CommandTable from '~/components/customComponents/CommandTable.vue';
import { useWebsiteStore } from '~/stores/perfiles'
const store = useWebsiteStore()
await callOnce(store.fetchCertificados)
const { certificados } = storeToRefs(store)
</script>

<style scoped>
    
</style>