<template>
  <section id="contacto" class="section contacto">
    <div class="orb orb-contact-a"></div>
    <div class="orb orb-contact-b"></div>

    <div class="contact-card">
      <p class="kicker">// contacto</p>
      <h2>¿Construimos algo juntos?</h2>
      <p class="desc">
        Estoy disponible para proyectos freelance y consultoría.
        Cuéntame tu idea y te respondo en menos de 24 horas.
      </p>

      <div class="redes">
        <a
          class="card primary"
          href="mailto:hola@gustavopaz.dev"
        >
          <Icon name="line-md:email" size="18" color="white"/>
          hola@gustavopaz.dev
        </a>
        <a
          class="card"
          href="https://github.com/guspaz0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="logos:github" size="18" color="var(--text)"/>
          GitHub
        </a>
      </div>

      <CustomMailer/>
    </div>
  </section>
</template>

<script setup lang="ts">
// SEO Meta tags (for Nuxt.js)
useHead({
    title: 'Contacto - Portfolio',
    meta: [
        {
          name: 'keywords',
          content: 'contacto, portfolio, gustavo rodolfo paz, desarrollo, software, full stack'
        }
    ]
})
</script>

<style scoped>
.contacto {
    align-items: center;
}

.contact-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 64px;
    border-radius: 24px;
    width: 100%;
    background-image: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
    border: 1px solid var(--line);
}

.contacto h2 {
    font-family: "Space Grotesk", sans-serif;
    font-size: 56px;
    font-weight: 700;
    letter-spacing: -1.5px;
    line-height: 1.05;
    background: none;
    -webkit-background-clip: initial;
    background-clip: initial;
    color: var(--text);
}

.desc {
    max-width: 520px;
    font-size: 17px;
    line-height: 1.6;
    color: var(--muted);
}

.redes {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.redes .card {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 30px;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--line);
    color: var(--text);
    font-size: 15px;
    font-weight: 500;
    transition: 250ms;
}

.redes .card:hover {
    transform: translateY(-2px);
    border-color: rgba(139, 124, 255, 0.4);
}

.redes .card.primary {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--btn-primary-text);
    font-weight: 600;
}

.redes .card.primary:hover {
    box-shadow: 0 8px 30px rgba(139, 124, 255, 0.35);
}

.orb-contact-a {
    top: -80px;
    right: 100px;
    width: 480px;
    height: 480px;
    background: var(--accent);
    opacity: 0.14;
}

.orb-contact-b {
    top: 200px;
    left: -100px;
    width: 440px;
    height: 440px;
    background: var(--accent-2);
    opacity: 0.1;
}

@media (max-width: 700px) {
    .contact-card {
        padding: 32px 24px;
    }

    .contacto h2 {
        font-size: 36px;
    }
}
</style>
