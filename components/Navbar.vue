<template>
    <nav ref="navRef" id="nav" class="navbar">
        <ul>
            <h2>{{ titulo }}</h2>
            <li>
                <MaterialSelect
                    v-model:value="currentProfile"
                    :options="perfiles.map(perf => ({ name: perf.nombre, value: perf.id }))"
                    :error="false"
                    :placeholder="'Perfil'"
                    :multiple="false"
                />
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
                <CustomDarkThemeButton/>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
const website = useWebsiteStore()
const { perfiles, currentProfile } = storeToRefs(website)

watch(() => currentProfile.value, (val) => console.log(val))
// Template ref
const navRef = useTemplateRef('navRef')

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

// Lifecycle hooks
onMounted(async () => {
    window.addEventListener('scroll', handleScroll)
    if (perfiles.value.length == 0 ) {
        await callOnce(website.fetchPerfiles)
    }
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
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
</style>
