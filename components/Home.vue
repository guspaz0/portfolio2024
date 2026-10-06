<template>
  <div class="home">
    <!-- Hero -->
    <section id="inicio" class="hero">
      <div class="orb orb-a"></div>
      <div class="orb orb-b"></div>
      <div class="orb orb-c"></div>

      <div class="hero-content">
        <span class="hero-badge">
          <span class="dot"></span>
          Disponible para nuevos proyectos
        </span>

        <h1 class="hero-title">
          Gustavo Paz<br/>
          <span class="gradient">Full Stack Developer</span>
        </h1>

        <p class="hero-tagline">
          Construyo productos digitales de punta a punta: interfaces que se sienten
          vivas y backends que aguantan la carga. Del diseño a la infraestructura,
          sin puntos ciegos.
        </p>

        <div class="hero-buttons">
          <a class="btn btn-primary" href="#proyectos" @click.prevent="scrollTo('#proyectos')">
            Ver proyectos
            <Icon name="line-md:arrow-right" size="16" color="white"/>
          </a>
          <NuxtLink
            class="btn btn-ghost"
            :href="resumeDrive"
            rel="noreferrer noopener"
            target="_blank"
          >
            Descargar CV
            <Icon name="line-md:download" size="16" color="var(--muted)"/>
          </NuxtLink>
        </div>
      </div>

      <div class="hero-visual">
        <JsLogo3D />
      </div>
    </section>

    <!-- Perfiles + Stack -->
    <Perfiles/>

    <!-- Stack -->
    <section id="stack" class="section">
      <div class="orb orb-stack"></div>
      <div class="section-head">
        <div>
          <p class="kicker">// stack</p>
          <h2>Tecnologías que domino</h2>
        </div>
      </div>
      <div class="stack-grid">
        <span v-for="tech in stack" :key="tech.nombre" class="stack-item">
          <Icon :name="`logos:${tech.icon}`" size="20" color="var(--accent-2)"/>
          <small>{{ tech.nombre }}</small>
        </span>
      </div>
    </section>

    <!-- Sobre mí -->
    <About />

    <!-- Contacto -->
    <Contacto />
  </div>
</template>

<script setup lang="ts">
const website = useWebsiteStore()
const { perfiles, currentProfile, darkMode } = storeToRefs(website)

const resumeDrive = 'https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing'

const stack = [
  { nombre: 'TypeScript', icon: 'typescript' },
  { nombre: 'React', icon: 'react' },
  { nombre: 'Next.js', icon: 'nextjs' },
  { nombre: 'Node.js', icon: 'nodejs' },
  { nombre: 'PostgreSQL', icon: 'postgresql' },
  { nombre: 'GraphQL', icon: 'graphql' },
  { nombre: 'Docker', icon: 'docker' },
  { nombre: 'AWS', icon: 'aws' },
  { nombre: 'Python', icon: 'python' },
  { nombre: 'Prisma', icon: 'prisma' },
  { nombre: 'Tailwind', icon: 'tailwindcss' },
  { nombre: 'Redis', icon: 'redis' }
]

const loginSecuence = ref<string[]>('login'.split(""))
const loginBuffer = ref<string[]>([])

const scrollTo = (href: string) => {
  const element = document.querySelector(href)
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}

const handleKeyUp = (event: KeyboardEvent) => {
  const key = event.key?.toLowerCase()
  const updated = [ ...loginBuffer.value, key].slice(-loginSecuence.value.length)
  if (updated.join('') === loginSecuence.value.join('')) {
    navigateTo('/login')
  }
  loginBuffer.value = updated
}

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyUp);
});

onMounted(async () => {
  document.addEventListener('keyup', handleKeyUp);
  if (perfiles.value.length === 0) {
    await callOnce(website.fetchPerfiles)
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 48px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
  min-width: 0;
}

.hero-visual {
  width: clamp(280px, 30vw, 420px);
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
  .hero-content {
    align-items: center;
  }
  .hero-visual {
    width: clamp(220px, 60vw, 320px);
  }
}

.orb-a {
  top: -220px;
  right: -40px;
  width: 520px;
  height: 520px;
  background: var(--accent);
  opacity: 0.12;
}

.orb-b {
  top: 360px;
  right: 120px;
  width: 420px;
  height: 420px;
  background: var(--accent-2);
  opacity: 0.1;
}

.orb-c {
  top: 420px;
  left: -140px;
  width: 360px;
  height: 360px;
  background: var(--pink);
  opacity: 0.07;
}

.orb-stack {
  top: -60px;
  left: -120px;
  width: 420px;
  height: 420px;
  background: var(--accent);
  opacity: 0.08;
}

.stack-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
}

.stack-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 12px;
  background: var(--surface);
  border: 1px solid var(--line);
}

.stack-item small {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

@media (max-width: 1100px) {
  .stack-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 700px) {
  .stack-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
