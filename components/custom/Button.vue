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
    padding: 10px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.close {
    background-color: rgba(250, 1, 1, 0.796);
    padding: 5px;
}
button.close:hover {
    background-color: rgba(250, 1, 1, 1);
}
.normal {
    background-color: #007bff;
}
button.normal:hover {
    background-color: #0056b3;
}

</style>