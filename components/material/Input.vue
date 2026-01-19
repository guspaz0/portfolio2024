<template>
    <div class="input-container" :style="{ width: width }">
        <input
            ref="inputRef"
            v-model="value"
            :class="inputClasses"
            :disabled="disabled"
            :type="type"
            :min="min"
            :max="max"
            :id="id"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
        />
        <label
            v-if="label"
            :class="labelClasses"
            :style="labelStyle"
        >
            {{ label }}
        </label>
        <div v-if="helperText" :class="helperTextClasses">
            {{ helperText }}
        </div>
    </div>
</template>
<script setup lang="ts">

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    variant: {
        type: String,
        default: 'outlined', // 'outlined', 'filled', 'standard'
        validator: (value: string) => ['outlined', 'filled', 'standard'].includes(value)
    },
    error: {
        type: Boolean,
        required: false,
        default: false
    },
    helperText: {
        type: String,
        required: false,
        default: ''
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    type: {
        type: String as PropType<'text' | 'password' | 'search' | 'date'>,
        required: true
    },
    min: {
        type: [String, Number],
        required: false,
        default: ''
    },
    max: {
        type: [String, Number],
        required: false,
        default: ''
    },
    id: {
        type: (String || Number),
        required: false
    },
    width: {
        type: String,
        required: false,
        default: '100%'
    }
})
const emit = defineEmits(['change', 'focus', 'blur', 'input'])
const value = defineModel({ required: true, type: String || Number })
const inputRef = useTemplateRef<HTMLInputElement | null>(null);
const focused = ref(false);

const hasValue = computed(() => {
    return value.value && value.value.toString().length > 0;
});

const inputClasses = computed(() => {
    return [
        'styled-input',
        props.variant,
        { 'error': props.error },
        { 'focused': focused.value },
        { 'disabled': props.disabled }
    ];
});

const labelClasses = computed(() => {
    return [
        'label',
        props.variant,
        { 'error': props.error },
        { 'focused': focused.value || hasValue.value },
        { 'disabled': props.disabled }
    ];
});

const helperTextClasses = computed(() => {
    return ['helper-text', props.variant, { 'error': props.error }];
});

const labelStyle = computed(() => {
    return {
        left: props.variant === 'standard' ? '0' : '12px',
        top: props.variant === 'filled' ? '20px' : props.variant === 'standard' ? '8px' : '16px'
    };
});

const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit('input', target);
};

const handleFocus = (e: Event) => {
    focused.value = true;
    emit('focus', e);
};

const handleBlur = (e: Event) => {
    focused.value = false;
    emit('blur', e);
};

</script>

<style scoped>
.input-container {
    position: relative;
    margin: 10px 0;
}

.styled-input {
    width: 100%;
    padding: 16px 12px 8px 12px;
    font-size: 16px;
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    border: 1px solid var(--material-ui-color);
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    transition: all 0.2s ease-in-out;
    color: var(--material-ui-color);
}

.styled-input:hover {
    border-color: var(--material-ui-color);
}

.styled-input:focus {
    border-color: #1976d2;
    border-width: 2px;
    padding: 15px 11px 7px 11px;
}

.styled-input:disabled {
    background-color: var(--material-ui-bg-disabled);
    color: var(--material-ui-color-disabled);
    border-color: var(--material-ui-border-disabled);
    cursor: not-allowed;
}

.styled-input.error {
    -color: #d32f2f;
}

.styled-input.error:focus {
    border-color: #d32f2f;
}

.styled-input.filled {
    background-color: var(--material-ui-bg-filled);
    border: none;
    border-bottom: 1px solid var(--material-ui-border-filled);
    border-radius: 4px 4px 0 0;
    padding: 20px 12px 6px 12px;
}

.styled-input.filled:hover {
    background-color: var(--material-ui-bg-pseudo-filled);
    border-bottom-color: rgba(0, 0, 0, 0.87);
}

.styled-input.filled:focus {
    background-color: var(--material-ui-bg-pseudo-filled);
    border-bottom: 2px solid #1976d2;
    padding: 19px 12px 5px 12px;
}

.styled-input.filled.error {
    border-bottom-color: #d32f2f;
}

.styled-input.filled.error:focus {
    border-bottom-color: #d32f2f;
}

.styled-input.standard {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--material-ui-border-filled);
    border-radius: 0;
    padding: 8px 0 9px 0;
}

.styled-input.standard:hover {
    border-bottom-color: var(--material-ui-color);
}

.styled-input.standard:focus {
    border-bottom: 2px solid #1976d2;
    padding: 8px 0 8px 0;
}

.styled-input.standard.error {
    border-bottom-color: #d32f2f;
}

.styled-input.standard.error:focus {
    border-bottom-color: #d32f2f;
}

.label {
    position: absolute;
    font-size: 16px;
    color: var(--material-ui-label-color);
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    transform-origin: left top;
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.label.focused,
.label.has-value {
    transform: translateY(v-bind('labelStyle.top === "8px" ? "-16px" : "-8px"')) scale(0.75);
    color: v-bind('props.error ? "#d32f2f" : "#1976d2"');
}

.label.error {
    color: #d32f2f;
}

.label.disabled {
    color: var(--material-ui-color-disabled);
}

.helper-text {
    font-size: 12px;
    margin-top: 3px;
    color: var(--material-ui-label-color);
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    min-height: 20px;
    display: flex;
    align-items: center;
}

.helper-text.error {
    color: #d32f2f;
}
</style>