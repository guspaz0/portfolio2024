<template>
    <div class="dialog-container">
        <dialog :open="true" class="dialog-content">
            <div>Logging Out...</div>
        </dialog>
    </div>
</template>
<script setup lang="ts">
import { useWebsiteStore } from '~/stores/perfiles'
definePageMeta({
    layout: 'dashboard'
})

const store = useWebsiteStore()
const { authenticated } = storeToRefs(store)

setTimeout(() => {
    //simular deslogueo
    navigateTo('/')
},2000)

onMounted(() => {
    authenticated.value = false
})
</script>

<style>
.dialog-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    inset: 0;
}
.dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid 1px #ccc;
    min-height: 150px;
    aspect-ratio: 1 / 1;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    backdrop-filter: blur(1);
}
</style>