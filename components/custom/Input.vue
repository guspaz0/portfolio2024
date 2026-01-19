<script setup lang="ts">
defineProps<{ 
    type: 'text' | 'search' | 'date',
    name: string,
    error: string | undefined,
}>()
const prop = defineModel<string>({
    required: true, default: ''
})

</script>

<template>
    <div class="input-container">
        <label :for="name">{{ name }}:</label>
        <input class="custom-input"
            :type="type" 
            :id="name" 
            :name="name"
            v-model="prop"
        />
        <small v-if="error" class="errors">{{ error }}</small>
    </div>
</template>


<style scoped>
.input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.custom-input {
    border-radius: 5px;
    padding: 5px;
    width: 250px;
}

small.errors {
    color: red;
}
</style>