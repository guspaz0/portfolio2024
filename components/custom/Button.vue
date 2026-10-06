<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
    title: {
        type: String,
        required: false,
        default: 'Enviar'
    },
    variant: {
        type: String as PropType<'normal' | 'close'>,
        required: false,
        default: 'normal'
    }
})

const emit = defineEmits(['onClick'])

function handleClick(event: Event) {
    emit('onClick', event)
}

</script>
<template>
    <button :class="variant" @click="handleClick">{{ title }}</button>
</template>

<style scoped>
button {
    padding: 10px 18px;
    color: var(--btn-primary-text);
    border: none;
    border-radius: 8px;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 200ms;
}

.close {
    background-color: rgba(250, 1, 1, 0.796);
    padding: 8px 14px;
}

button.close:hover {
    background-color: rgba(250, 1, 1, 1);
}

.normal {
    background-color: var(--accent);
}

button.normal:hover {
    background-color: #7a6af0;
}
</style>
