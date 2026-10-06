<template>
    <main class="page">
        <Navbar/>
        <slot></slot>
        <footer class="mainfooter">
            <span class="copy">© 2025 Gustavo Paz. Hecho con TypeScript y café.</span>
            <nav class="links">
                <a href="https://www.linkedin.com/in/gustavo-rodolfo-paz/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://twitter.com/guspaz0" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://github.com/guspaz0" target="_blank" rel="noopener noreferrer">GitHub</a>
            </nav>
        </footer>
    </main>
</template>

<style scoped>
.page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.page > :deep(section:last-of-type) {
    flex: 1;
}
</style>
