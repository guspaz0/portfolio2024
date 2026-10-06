<template>
    <div class="select-container" ref="selectRef" @blur="handleBlur">
        <label v-if="label" class="label">{{ label }}</label>

        <div v-if="multiple && value.length > 0" class="chips-container">
            <span v-for="val in value" :key="val" class="chip">
                {{ getOptionName(val) }}
                <button class="chip-remove" @click.prevent="handleChipRemove(val, $event)">×</button>
            </span>
        </div>

        <button
            type="button"
            class="select-button"
            :class="{ 'has-value': hasValue, 'is-error': error, 'is-open': isOpen, 'show-btn': ulWidth !== 'max-content' }"
            @click="handleToggle"
        >
            <span>{{ getDisplayValue() }}</span>
            <span class="arrow" :class="{ 'is-open': isOpen }">▼</span>
        </button>

        <ul v-if="isOpen" 
            class="dropdown-list" 
            :style="{ width: ulWidth }"
        >
            <template v-if="!groupOptions">
                <li
                    v-for="option in props.options"
                    :key="option.value + '-' + option.name"
                    class="dropdown-item"
                    :class="{ 'is-selected': isSelected(option.value) }"
                    @click="handleOptionClick(option.value)"
                >
                {{ option.name }}
                </li>
            </template>

            <template v-else>
                <ul v-for="([group, options2], index) in groupOptionsEntries" :key="index">
                    <li><b>{{ group }}</b></li>
                    <li
                        v-for="option in options2"
                        :key="option.value + '-' + option.name"
                        class="dropdown-item"
                        :class="{ 'is-selected': isSelected(option.value) }"
                        @click="handleOptionClick(option.value)"
                    >
                        {{ option.name }}
                    </li>
                </ul>
            </template>
        </ul>

        <span v-if="error" class="error-text">{{ error }}</span>
        <span v-else-if="helperText" class="helper-text">{{ helperText }}</span>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['change', 'blur'])

const selectRef = useTemplateRef<HTMLElement | null>('selectRef')
    
const props = defineProps({
    options: { 
        required: true, 
        type: Array as PropType<Array<{ value: number, name: string }>>, 
        default: [] 
    },
    groupOptions: {
        type: Map as PropType<Map<string, Record<string, any>[]>>,
        required: false
    },
    placeholder: {
        type: String,
        default: 'Select an option'
    },
    label: {
        type: String,
        required: false
    },
    error: {
        type: Boolean,
        default: false
    },
    helperText: {
        type: String,
        required: false
    },
    multiple: {
        type: Boolean,
        default: false
    },
    ulWidth: {
        type: String as () => 'max-content' | 'auto',
        default: 'auto'
    }
})
const value = defineModel('value', {
    required: true,
    type: [Array, Number, String] as PropType<Array<number> | number | string>
})
const isOpen = ref<boolean>(props.ulWidth === 'max-content')

const handleToggle = () => {
    isOpen.value = !isOpen.value
}

const handleOptionClick = (optionValue: number) => {
    if (props.multiple) {
        const newValue = value.value.includes(optionValue)
            ? (value.value as number[]).filter(v => v !== +optionValue)
            : [...value.value as number[], optionValue]
        value.value = newValue
    } else {
        value.value = optionValue
        isOpen.value = false
    }
}

const handleChipRemove = (optionValue: string, event: Event) => {
    event.stopPropagation()
    const newValue = (value.value as number[]).filter(v => v !== +optionValue)
    value.value = newValue
}

const getDisplayValue = () => {
    if (props.multiple) {
        return value.value.length > 0 ? `${value.value.length} Selected` : props.placeholder
    } else {
        const selectedOption = props.options?.find(opt => opt.value === +value.value)
        return selectedOption ? selectedOption.name : props.placeholder
    }
}

const hasValue = computed(() => (props.multiple ? value.value.length > 0 : value.value !== ''))

const getOptionName = (value: number) => {
    const option = props.options?.find(opt => opt.value === value)
    return option ? option.name : value
}

const isSelected = (optionValue: number) => {
    return props.multiple ? (value.value as number[]).includes(optionValue) : value.value === optionValue
}

const groupOptionsEntries = computed(() => {
    return props.groupOptions ? Array.from(props.groupOptions.entries()) : []
})

const handleBlur = (event: Event) => {
    if (isOpen.value == true) {
        isOpen.value = false
    }
    emit('blur', event)
}

onMounted(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
            isOpen.value = false
        }
    }
    document.addEventListener('mousedown', handleClickOutside)
    onUnmounted(() => {
        document.removeEventListener('mousedown', handleClickOutside)
    })
})

</script>

<style scoped>

.select-container {
    position: relative;
    width: 100%;
    max-width: 300px;
    margin-bottom: 0;
}

.label {
    display: block;
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 6px;
    padding-left: 2px;
}
.chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 8px;
}
.chip {
    background-color: #3b82f6;
    color: var(--bg-color);
    padding: 4px 8px;
    border-radius: 16px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
}
.chip-remove {
    background: none;
    border: none;
    color: var(--bg-color);
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0;

}
.chip-remove:hover {
    background-color: var(--material-ui-bg-disabled);
    border-radius: 50%;
}
.select-button {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    text-align: left;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: inherit;
    color: var(--text);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
}

.select-button:hover {
    border-color: var(--accent);
}
.select-button:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(139, 124, 255, 0.15);
}
.select-button.is-open {
    display: flex;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(139, 124, 255, 0.15);
}
.select-button.is-error {
    border-color: #ef4444;
    color: var(--text);
}
.select-button.is-error:hover,.is-error:focus {
    border-color: #ef4444;
}
.select-button .arrow {
    margin-left: 8px;
    transform: rotate(0deg);
    transition: transform 0.2s ease;
    color: var(--muted);
    font-size: 10px;
}
.select-button .arrow.is-open {
    transform: rotate(180deg);
}
.dropdown-list {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 4px);
    background: color-mix(in srgb, var(--bg) 92%, transparent);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    max-height: 220px;
    overflow-y: auto;
    z-index: 10000;
    margin: 0;
    padding: 6px;
    list-style: none;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}
.dropdown-list.is-selected {
    width: v-bind('ulWidth')
}
.dropdown-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.dropdown-item {
    padding: 10px 14px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.2s ease;
    color: var(--text);
    font-size: 14px;
}
.dropdown-item:hover {
    background-color: var(--surface-2);
}
.dropdown-item.is-selected {
    background-color: var(--accent);
    color: var(--btn-primary-text);
}
.dropdown-item.is-selected:hover {
    background-color: var(--accent);
}
.error-text {
    color: #ef4444;
    font-size: 12px;
    margin-top: 4px;
    display: block;
}
.helper-text {
    color: var(--muted);
    font-size: 12px;
    margin-top: 4px;
    display: block;
}
</style>