<script setup lang="ts">
defineProps<{ 
    errors?: boolean,
    content?: string
}>()

</script>

<template>
    <div class="submit-btn-container">
        <button type="submit">{{ content || 'Enviar' }}</button>
        <small v-if="errors" class="errors">Corregir los errores</small>
    </div>
</template>

<style scoped>
.submit-btn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

small.errors {
    color: red;
}
</style>