<template>
    <section id="github-insights" class="section">
        <div class="section-head">
            <div>
                <p class="kicker">// github</p>
                <h2>Repositorios recientes</h2>
            </div>
            <a class="gh-link" :href="`https://github.com/${username}`" target="_blank" rel="noopener noreferrer">
                Ver perfil →
            </a>
        </div>

        <div v-if="loading" class="loading">
            <span>·</span><span>·</span><span>·</span>
        </div>

        <div v-else-if="error" class="error">
            {{ error }}
        </div>

        <div v-else-if="starredRepos.length === 0" class="no-data">
            No hay repositorios con estrellas todavía
        </div>

        <div v-else class="repositories-grid">
            <div
                v-for="repo in starredRepos"
                :key="repo.id"
                class="repository-card"
            >
                <h3>
                    <a :href="repo.html_url" target="_blank" rel="noopener noreferrer">
                        {{ repo.name }}
                    </a>
                </h3>
                <p class="description">{{ repo.description }}</p>

                <div class="repo-stars">
                    <span class="stars">
                        <Icon name="line-md:star" size="14" color="var(--accent)"/>
                        <b>{{ repo.stargazers_count }}</b>
                        <small>estrellas en GitHub</small>
                    </span>
                </div>

                <div class="repo-topics" v-if="repo.topics.length > 0">
                    <span
                        v-for="topic in repo.topics.slice(0, 3)"
                        :key="topic"
                        class="topic"
                    >
                        {{ topic }}
                    </span>
                </div>

                <div class="repo-meta">
                    <time>Actualizado: {{ formatDate(repo.updated_at) }}</time>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

const props = defineProps({
    username: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 10
    }
})

const repositories = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const starredRepos = computed(() =>
    repositories.value
        .filter(repo => (repo.stargazers_count || 0) > 0)
        .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
)

const { fetchRepositories } = useGithubApi()

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const fetchRepositoriesData = async () => {
    try {
        loading.value = true
        error.value = null
        repositories.value = await fetchRepositories(props.username, 100)
    } catch (err) {
        error.value = 'Error al cargar los repositorios'
        console.error(err)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchRepositoriesData()
})

watch(() => props.username, () => {
    fetchRepositoriesData()
})

defineExpose({
    fetchRepositoriesData
})
</script>

<style scoped>
.section-head {
    justify-content: space-between;
    align-items: center;
}

.gh-link {
    font-size: 14px;
    color: var(--muted);
    transition: 200ms;
}

.gh-link:hover {
    color: var(--accent-2);
}

.loading {
    display: flex;
    gap: 6px;
    font-size: 24px;
    color: var(--accent);
    padding: 24px 0;
}

.error,
.no-data {
    color: var(--muted);
}
</style>
