<template>
    <div class="dashboard-container">
        <div>
            <details>
                <summary>Crear {{ entity }}</summary>
                <component :is="createComponent"/>
            </details>
        </div>
        <div class="dashboard-content">
            <FlexList :data="data"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import FlexList from './FlexList.vue';
defineProps({
    entity: {
        type: String,
        required: true,
    },
    createComponent: {
        type: Object,
        required: true,
        validator: (value: any) => {
            return typeof value === 'function' || typeof value === 'object';
        },
    },
    data: {
        type: Array,
        required: true,
    }
})

</script>

<style>
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
details {
    width: fit-content;
    border-radius: 5px;
}
details > summary {
    padding: 5px;
    border-radius: 5px;
}
details > summary:hover {
    background-color: var(--bg-color);
}
</style>