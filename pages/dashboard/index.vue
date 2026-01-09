<!-- pages/dashboard.vue -->

<template>
    <div class="dashboard-container">
        <div>
            
        </div>
        <div class="dashboard-content">
            
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>