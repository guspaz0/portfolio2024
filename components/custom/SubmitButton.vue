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
    padding: 10px 20px;
    background-color: var(--accent);
    color: var(--btn-primary-text);
    border: none;
    border-radius: 8px;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 200ms;
}

button:hover {
    background-color: #7a6af0;
}

small.errors {
    color: #ff5c8a;
}
</style>
