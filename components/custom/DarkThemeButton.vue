<script setup lang="ts">
const website = useWebsiteStore()
const { darkMode } = storeToRefs(website)

const colorMode = useColorMode()
const toggleTheme = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
    const userPrefer = window.matchMedia(`(prefers-color-scheme: dark)`).matches
    darkMode.value = userPrefer
})
</script>

<template>
    <button
        class="theme-toggle"
        type="button"
        :title="colorMode.value === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
        @click="toggleTheme"
    >
        <Icon :name="colorMode.value === 'dark' ? 'line-md:sunny' : 'line-md:moon'" size="18" color="var(--muted)"/>
    </button>
</template>

<style scoped>
.theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--surface);
    cursor: pointer;
    transition: 250ms;
}

.theme-toggle:hover {
    border-color: var(--accent);
}
</style>
