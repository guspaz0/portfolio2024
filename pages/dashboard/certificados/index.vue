<template>
    <CommandTable 
        :entity="'certificado'" 
        :create-component="AddCertificado" 
        :data="certificados.map((cert) => ({ ...cert, escuela: cert.escuela?.nombre}))"
    />
</template>
<script setup lang="ts">
import AddCertificado from '~/components/certificados/addCertificado.vue';
import CommandTable from '~/components/composables/CommandTable.vue';
import { useWebsiteStore } from '~/stores/perfiles'
definePageMeta({
    layout: 'dashboard'
})
const store = useWebsiteStore()
await callOnce(store.fetchCertificados)
const { certificados } = storeToRefs(store)

</script>

<style scoped>
    
</style>