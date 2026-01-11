<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: false,
        default: 'Enviar'
    }
})
const emit = defineEmits(['onClick'])

function handleClick(event: Event) {
    emit('onClick', event)
} 
</script>
<template>
    <button @click.prevent="handleClick">{{ title }}</button>
</template>


<style scoped>
button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>