<template>
    <CommandTable 
        :entity="'certificado'" 
        :create-component="Add" 
        :data="certificados.map((cert) => ({ ...cert, escuela: cert.escuela?.nombre}))"
    />
</template>
<script setup lang="ts">
import Add from '~/components/certificados/Add.vue';
definePageMeta({
    layout: 'dashboard'
})
const store = useWebsiteStore()
await callOnce(store.fetchCertificados)
const { certificados } = storeToRefs(store)

</script>

<style scoped>
    
</style>