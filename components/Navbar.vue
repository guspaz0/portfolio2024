<template>
    <nav ref="navRef" id="nav" class="navbar">
        <ul>
            <h2>{{ titulo }}</h2>
            <li>
                <select name="perfil"
                    v-model="currentProfile"
                    @change="handleSelectChange"
                >
                    <option v-for="perfil in perfiles"
                        :key="perfil.id"
                        :value="perfil.id"
                    >
                        {{ perfil.nombre }}
                    </option>
                </select>
            </li>
            <li v-for="item in listasNav" :key="item.href">
                <a
                    :href="item.href"
                    @click="handleNavClick(item.href)"
                    class="nav-link"
                >
                {{ item.nombre }}
                </a>
            </li>
            <li>
                <input
                    type="checkbox"
                    id="switch"
                    class="checkbox"
                    @click="toggleDarkMode"
                    :checked="darkMode"
                />
                <label for="switch" class="toggle"></label>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import type { Perfil } from '~/server/types/Perfil'
import { useWebsiteStore } from '~/stores/perfiles'
const website = useWebsiteStore()
await callOnce(website.fetchPerfiles)
const { perfiles, currentProfile, darkMode } = storeToRefs(website)

// Template ref
const navRef = ref(null)

// Reactive data
const titulo = "Portfolio"
const listasNav = [
    { href: '#inicio', nombre: 'Inicio' },
    { href: '#timeline', nombre: 'Experiencia' },
    { href: '#about', nombre: 'Sobre mi' },
    { href: '#aptitudes', nombre: 'Aptitudes' },
    { href: '#proyectos', nombre: 'Proyectos' },
    { href: '#certificados', nombre: 'Certificados' },
    { href: '#contacto', nombre: 'Contacto' }
]

// Methods
const handleScroll = () => {
    const scroll = window.scrollY
    if (navRef.value) {
        if (scroll > 80) {
            navRef.value.style.position = 'fixed'
            navRef.value.style.height = '5%'
            navRef.value.style.top = '0'
            navRef.value.style.left = '0'
            navRef.value.style.right = '0'
            navRef.value.style.zIndex = '1000'
        } else {
            navRef.value.style.position = 'relative'
            navRef.value.style.height = 'auto'
            navRef.value.style.top = 'auto'
            navRef.value.style.left = 'auto'
            navRef.value.style.right = 'auto'
        }
    }
}

const handleSelectChange = (e: Event) => {
    e.target.blur()
}

const handleNavClick = (href: string) => {
  // Smooth scroll to section
    if (href.startsWith('#')) {
            const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }
}

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

// Lifecycle hooks
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    const userPrefer = window.matchMedia(`(prefers-color-scheme: dark)`).matches
    darkMode.value = userPrefer
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar select {
    background-color: var(--bg-color);
    color: var(--text-color);
    opacity: inherit;
}
.navbar option {
    opacity: 0.5;
}
.navbar {
    position: relative;
    place-items: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    z-index: 50;
    gap: 10px;
}

.navbar > ul {
    list-style-type: none;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(0,0,0, 0.5);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 10px;
}

ul > h2 {
    margin-top: 1px;
    margin-bottom: 1px;
    filter: drop-shadow(0 0 1px white) contrast(2);
}

li > a {
    text-decoration: none;
    color: white;
    transition: 250ms;
}

li > a:hover {
    background-color: rgba(255,255,255,0.2);
    padding: 5px;
    border-radius: 5px;
}

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
