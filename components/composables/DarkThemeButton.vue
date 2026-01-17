<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWebsiteStore } from '~/stores/perfiles'
const website = useWebsiteStore()
const { darkMode } = storeToRefs(website)

const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    const appTheme = document.documentElement
    if (darkMode.value) {
        console.log('Dark mode enabled')
        appTheme.classList.remove('light')
        appTheme.classList.add('dark')
    } else {
        console.log('Dark mode disabled')
        appTheme.classList.remove('light')
        appTheme.classList.add('dark')
    }
}

onMounted(() => {
    const userPrefer = window.matchMedia(`(prefers-color-scheme: dark)`).matches
    darkMode.value = userPrefer
})
</script>

<template>
    <div>
        <input
            id="switch"
            type="checkbox"
            class="checkbox"
            :checked="darkMode"
            @click="toggleDarkMode"
        />
        <label for="switch" class="toggle"></label>
    </div>
</template>

<style scoped>
.toggle {
    position : relative ;
    display : inline-block;
    width: 54px;
    height: 30px;
    background-color: rgba(255,255,255,0.5);
    border-radius: 30px;
}

.toggle:after {
    content: '';
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: rgba(0,0,255,0.3);
    top: 2px;
    left: 2px;
    background-image: url('https://res.cloudinary.com/dbowsjk6p/image/upload/v1726354393/sun_qemswh.svg');
    background-position: center;
    background-size: cover;
    transition:  all 0.5s;
}

.toggle > p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
}

.checkbox:checked + .toggle::after {
    left : 26px;
    background-image: url('https://res.cloudinary.com/dbowsjk6p/image/upload/v1726354393/crescent-moon-moon_x8fbf8.svg');
    background-position: center;
    background-size: cover;
}
.checkbox:checked + .toggle {
    background-color: rgba(9,162,182,0.5);
}

.checkbox {
    display : none;
}
</style>