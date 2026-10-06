<template>
    <nav ref="navRef" id="nav" class="navbar">
        <a class="nav-brand" href="#inicio">
            <img class="nav-logo" src="https://avatars.githubusercontent.com/u/103156469?v=4" alt="Gustavo Paz" width="36" height="36" loading="eager" />
            <span class="name">gustavo.paz</span>
        </a>

        <button
            class="nav-toggle"
            :class="{ open: menuOpen }"
            type="button"
            @click="menuOpen = !menuOpen"
            :aria-expanded="menuOpen"
            aria-label="Abrir menú"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>

        <div class="nav-menu" :class="{ open: menuOpen }">
            <ul>
                <li class="nav-profile-item">
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
            <a class="nav-cta" href="#contacto" @click="handleNavClick('#contacto')">Hablemos</a>
        </div>
    </nav>
</template>

<script setup lang="ts">
const website = useWebsiteStore()
const { perfiles, currentProfile } = storeToRefs(website)

// Template ref
const navRef = useTemplateRef('navRef')

// Reactive data
const menuOpen = ref(false)
const listasNav = [
    { href: '#proyectos', nombre: 'Proyectos' },
    { href: '#timeline', nombre: 'Experiencia' },
    { href: '#about', nombre: 'Sobre mí' },
    { href: '#contacto', nombre: 'Contacto' }
]

// Methods
const handleNavClick = (href: string) => {
  // Smooth scroll to section
    if (href.startsWith('#')) {
            const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }
    menuOpen.value = false
}

// Lifecycle hooks
onMounted(async () => {
    if (perfiles.value.length == 0 ) {
        await callOnce(website.fetchPerfiles)
    }
})
</script>
