<template>
    <div class="dashboard-layout">
        <header class="dashboard-header">
            <a class="nav-brand" href="/">
                <span class="nav-logo"></span>
                <span class="name">gustavo.paz</span>
            </a>
            <ul class="menu-links">
                <li v-for="link in menu" :id="link.name" class="link">
                    <NuxtLink :to="link.link" class="nav-link">
                        {{ link.name }}
                    </NuxtLink>
                </li>
                <li>
                    <CustomDarkThemeButton/>
                </li>
                <li>
                    <AuthState>
                        <template #default="{ loggedIn, clear, user }">
                            <b v-if="user" class="user">{{ user.email.split('@')[0] }}</b>
                            <CustomButton v-if="loggedIn" :title="'Logout'" @click="clear"/>
                            <NuxtLink v-else to="/login" class="nav-cta">Login</NuxtLink>
                        </template>
                    </AuthState>
                </li>
            </ul>
        </header>
        <main class="dashboard-content">
            <slot></slot>
        </main>
    </div>
</template>
<script setup lang="ts">

const menu = ref<Record<string, string>[]>([
    { name: 'Portfolio', link: '/'},
    { name: 'Aptitudes', link: '/dashboard/aptitudes' },
    { name: 'Certificados', link: '/dashboard/certificados'},
    { name: 'Escuelas', link: '/dashboard/escuelas' },
    { name: 'proyectos', link: '/dashboard/proyectos' },
])

const activePage = ref('')

function handleActivePage(e: Event) {
    activePage.value = (e.target as HTMLElement).id
}

</script>

<style>
.dashboard-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
.dashboard-header {
    width: 100%;
    padding: 18px 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    z-index: 10000;
    background: var(--surface);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border-bottom: 1px solid var(--line);
    position: sticky;
    top: 0;
}
.dashboard-content {
    margin: 0;
    padding: 32px 56px;
    flex: 1;
}
.menu-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    margin: 0;
    gap: 8px;
    flex-wrap: wrap;
}
.menu-links > li {
    display: flex;
    align-items: center;
}
.menu-links > li.link:hover .nav-link {
    color: var(--text);
    background-color: var(--surface-2);
}
.menu-links .user {
    font-size: 13px;
    color: var(--muted);
    padding: 8px 12px;
}
</style>
