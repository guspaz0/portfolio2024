<template>
    <div>
        <h2>Sobre mi</h2>
        <section id="about" class="about">
            <span>
                <NuxtImg
                    src="https://github-readme-stats.vercel.app/api?username=guspaz0&show_icons=true"
                    alt="GitHub Stats"
                    format="webp"
                />

                <NuxtImg
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=guspaz0&size_weight=0.5&count_weight=0.5&hide=dockerfile,ejs,css,scss,html,handlebars,procfile&layout=compact&langs_count=6&theme=default"
                    alt="Top Languages"
                    format="webp"
                />
                <p>{{ mensaje }}</p>
                <p>{{ parrafo2 }}</p>
                <a :href="resumeDrive" rel="noreferrer noopener" target="_blank">
                    <span class="card resume">
                        CV / Resume
                    </span>
                </a>
            </span>
            <div class="perfil">
                <span class="">
                <NuxtImg
                    @contextmenu.prevent=""
                    src="https://avatars.githubusercontent.com/u/103156469?v=4"
                    height=""
                    alt="perfil"
                    loading="lazy"
                />
                <div class="shadow"></div>
                </span>
                <NuxtImg
                    @contextmenu.prevent=""
                    id="flag"
                    src="https://codingweek.org/wp-content/uploads/2023/09/chris-ried-ieic5Tq8YMk-unsplash-2048x1367.jpg"
                    alt="country flag"
                    loading="lazy"
                />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
// Reactive data
const resumeDrive = 'https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing'
const mensaje = "Un apasionado por la tecnologia y el analisis de datos"
const parrafo2 = 'Soy una persona proactiva, curiosa, flexible y perseverante. Nunca paro de aprender.'


// SEO Meta tags (for Nuxt.js)
useHead({
    title: 'Sobre Mi - Portfolio',
    meta: [
        { name: 'description', content: 'Información sobre mi experiencia y habilidades en desarrollo web' }
    ]
})
</script>


<style scoped>
div.perfil {
    max-width: 350px;
    max-height: 350px;
    filter: grayscale(100%);
}

span.links {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.about {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
}

.about > span > p {
    max-width: 400px;
}

.about > span {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.about > span > img {
    mask-image: none;
    min-width: 300px;
}

.about img {
    max-width: 300px;
    mask-image: linear-gradient(black 70%, transparent);
    filter: drop-shadow(0 0 2px white);
}

div.shadow {
    position: absolute;
    z-index: -11;
    width: 20px;
    height: 20px;
    left: 140px;
    bottom: 190px;
    border-radius: 50%;
    background-color: var(--text-color);
    border: none;
}
.shadow {
    animation: pulse 2.0s infinite;
}
</style>
