<template>
    <div class="cards-container">
        <div class="card-row">
            <div v-for="[key, value] in Object.entries(data[0])"
                class="card-item" 
                :style="{ flexGrow: typeof value == 'number' ? '0' : '1' }">
                <b>{{ key }}</b>
            </div>
        </div>
        <div v-for="apt in data" class="card-row" :key="Math.round(Date.now()*Math.random())">
            <div v-for="value in Object.values(apt)" 
                class="card-item" 
                :style="{ flexGrow: typeof value == 'number' ? '0' : '1' }">
                {{ value }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    data: {
        type: Array<any>,
        default: []
    }
})
</script>

<style scoped>
.cards-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5px;
    padding: 5px;
    width: 95%
}

.card-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.card-item {
    flex-basis: 80px; /* Fixed length for each item */
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
    max-width: 300px;
}
</style>