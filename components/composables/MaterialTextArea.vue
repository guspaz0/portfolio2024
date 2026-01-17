<template>
    <div class="material-textarea-container">
        <label :for="label" :class="{'material-textarea-label': true, 'is-error': error }">{{ label }}</label>
        <textarea
            :id="label"
            v-model="value"
            :class="{'material-textarea': true, 'is-error': error}"
            :placeholder="placeholder || ''"
            :rows="rows"
            :cols="cols"
        ></textarea>
        <small v-if="error" class="errors">{{ helperText }}</small>
    </div>
</template>

<script setup lang="ts">

defineProps({
    placeholder: {
        type: String,
        default: '',
        required: false
    },
    label: { type: String, required: true },
    rows: { type: Number, required: false, default: 5 },
    cols: { type: Number, required: false, default: 30 },
    error: { type: Boolean, required: false, default: false },
    helperText: { type: String, required: false, default: '' }
})
const value = defineModel({ required: true, type: String })

</script>

<style scoped>
.material-textarea-container {
    position: relative;
    margin: 20px 0;
}

.material-textarea-label {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 14px;
    color: var(--material-ui-label-color);
    transition: all 0.2s ease-in-out;
    pointer-events: none;
}

.material-textarea {
    padding: 10px;
    border: 1px solid var(--material-ui-color);
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.2s ease-in-out;
}

.material-textarea-label:has(+ .material-textarea:focus),
.material-textarea-label:has(+ .material-textarea:not(:placeholder-shown)) {
    top: -18px;
    left: 0;
    font-size: 12px;
    color: #1976d2;
    background-color: transparent;
    padding: 0 5px;

    &.is-error {
        color: #d32f2f;
    }
}

.material-textarea:focus {
    border-color: 5px solid #1976d2;
    box-shadow: 0 0 0 2px rgba(76, 76, 175, 0.2);
    outline: none;
}
.material-textarea.is-error {
    border-color: 2px solid #d32f2f;
    box-shadow: 0 0 0 2px rgba(247, 18, 18, 0.2);
}
.material-textarea-label.is-error, small.errors {
    color: #d32f2f;
}
</style>