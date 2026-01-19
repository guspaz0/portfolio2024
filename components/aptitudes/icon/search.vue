<script setup lang="ts">
import { icons } from '@iconify-json/logos'

const icon = defineModel<string>({
    required: true,
    type: String
})
const props = defineProps({
    error: {
        type: Boolean,
        default: false,
        required: true
    },
    helperText: {
        type: String,
        default: '',
        required: true
    }
})

const searchResult = ref<string[]>([])

const timer = (): Promise<string[]> => new Promise((resolve) => {
    setTimeout(() => {
        resolve(Object.keys(icons.icons).filter((icn) => icn.toLowerCase().includes(icon.value.toLowerCase())))
    }, 2000)
})

watch(icon, async (val) => {
    searchResult.value = await timer()
})

</script>
<template>
    <MaterialInput 
        v-model="icon"
        :label="'icon'"
        :type="'search'"
        :error="props.error"
        :helper-text="props.helperText"
        :variant="'standard'"
    />
    <div class="icons-container">
        <span v-for="icon in searchResult" :key="icon" class="item">
            <small>{{ icon }}</small>
            <Icon :name="'logos:'+icon" size="2em"/>
        </span>
    </div>
</template>

<style scoped>
.icons-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    max-height: 50vh;
    overflow-y: auto;
    overflow-x: hidden;
}
.item {
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: center;
}
</style>