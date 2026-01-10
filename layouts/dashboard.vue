<template>
<header class="dashboard-header">
    <h2>Dashboard</h2>
    <ul class="menu-links">
        <li v-for="link in menu">
            <NuxtLink :to="link.link">{{ link.name }}</NuxtLink>
        </li>
    </ul>
</header>
<slot></slot>
</template>
<script setup lang="ts">
const menu = ref<Record<string, string>[]>([
    { name: 'Crear Aptitud', link: '/dashboard/addAptitud' },
    { name: 'Crear Certificado', link: '/dashboard/addCertificado'},
    { name: 'Portfolio', link: '/'},
])

</script>

<style>
.dashboard-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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