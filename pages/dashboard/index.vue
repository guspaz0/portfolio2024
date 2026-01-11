<template>
    <div class="dashboard-container">
        <div>
            
        </div>
        <div class="dashboard-content">
            <h3>Contador de Entidades</h3>
            <div class="content">
                <span v-for="[entity, count] in Object.entries(entitiesCount)" :key="entity"><b>{{ entity }}: </b>{{ count }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})
import { useWebsiteStore } from '~/stores/perfiles'
const store = useWebsiteStore()
await callOnce(store.fetchCountEntities)
const { entitiesCount } = storeToRefs(store)

</script>

<style scoped>
.dashboard-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    padding: auto;
    display: flex;
    flex-direction: column;
}

.dashboard-container h2 {
    text-align: center;
}

.dashboard-container p {
    text-align: center;
}

.dashboard-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: 'center';
    gap: 5px;
}

.content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.content > span {
    border: solid 1px #ccc;
    border-radius: 5px;
    padding: 10px;
}
</style>