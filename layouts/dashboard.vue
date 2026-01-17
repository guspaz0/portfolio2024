<template>
    <div class="dashboard-layout">
        <header class="dashboard-header">
            <h2>Dashboard</h2>
            <ul class="menu-links">
                <li v-for="link in menu" :id="link.name">
                    <NuxtLink :to="link.link">
                        {{ link.name }}
                    </NuxtLink>
                </li>
                <li>
                    <DarkThemeButton/>
                </li>
            </ul>
        </header>
        <main class="dashboard-content">
            <slot></slot>
        </main>
    </div>
</template>
<script setup lang="ts">
import DarkThemeButton from '~/components/composables/DarkThemeButton.vue';

const menu = ref<Record<string, string>[]>([
    { name: 'Portfolio', link: '/'},
    { name: 'Aptitudes', link: '/dashboard/aptitudes' },
    { name: 'Certificados', link: '/dashboard/certificados'},
    { name: 'Escuelas', link: '/dashboard/escuelas' },
    { name: 'proyectos', link: '/dashboard/proyectos' },
    { name: 'Logout', link: '/logout' }
])

const activePage = ref('')

function handleActivePage(e: Event) {
    activePage.value = (e.target as HTMLElement).id
}

</script>

<style>
li .active {
    background-color: rgba(0,0,0,0.3);
}
.dashboard-layout {
    height: -webkit-fill-available;
}
.dashboard-header {
    width: -webkit-fill-available;
    padding-inline: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 10000;
}
.dashboard-content {
    margin: 0;
}
.menu-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    margin: 0;
    gap: 5px;
}
.menu-links > li {
    border: 1px solid rgba(0, 0,0, 0.3);
    border-radius: 5px;
    padding: 5px;
}
.menu-links > li:hover {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
}
</style>