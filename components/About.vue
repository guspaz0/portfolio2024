<template>
    <section id="about" class="section">
        <div class="orb orb-about"></div>
        <div class="section-head">
            <div>
                <p class="kicker">// sobre mí</p>
                <h2>Más allá del código</h2>
            </div>
        </div>

        <div class="about">
            <div class="about-text">
                <p>
                    Soy un desarrollador full stack con 6 años construyendo productos.
                    Me obsesiona la intersección entre el diseño y la ingeniería:
                    interfaces que se sienten vivas, backends que aguantan la carga,
                    y sistemas que se pueden mantener.
                </p>
                <p>
                    Cuando no estoy programando, escribo sobre arquitectura de software
                    o contribuyo a open source.
                </p>
                <NuxtLink :href="resumeDrive" rel="noreferrer noopener" target="_blank" class="btn btn-ghost">
                    CV / Resume
                    <Icon name="line-md:download" size="16" color="var(--muted)"/>
                </NuxtLink>
            </div>

            <div class="stats">
                <div class="stat">
                    <b>6+</b>
                    <small>Años de experiencia</small>
                </div>
                <div class="stat">
                    <b>40+</b>
                    <small>Proyectos entregados</small>
                </div>
                <div class="stat">
                    <b>2.1k</b>
                    <small>Estrellas en GitHub</small>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const resumeDrive = 'https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing'
</script>

<style scoped>
.about {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
    align-items: start;
}

.about-text {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
}

.about-text p {
    max-width: 620px;
    font-size: 16px;
    line-height: 1.7;
    color: var(--muted);
}

.stats {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 18px 20px;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--line);
}

.stat b {
    font-family: "Space Grotesk", sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--accent-2);
}

.stat small {
    font-size: 13px;
    color: var(--muted);
}

.orb-about {
    top: -40px;
    right: -120px;
    width: 420px;
    height: 420px;
    background: var(--accent);
    opacity: 0.08;
}

@media (max-width: 900px) {
    .about {
        grid-template-columns: 1fr;
    }
}
</style>
