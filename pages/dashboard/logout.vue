<template>
    <dialog>
        <summary>Log Out</summary>
        <p>...</p>
    </dialog>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})
import { useWebsiteStore } from '~/stores/perfiles'

const store = useWebsiteStore()
const { authenticated } = storeToRefs(store)
onMounted(() => {
    authenticated.value = false
    setTimeout(() => {
        navigateTo('/')
    },2000)
})
</script>