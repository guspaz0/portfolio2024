<template>
    <article @contextmenu.prevent>
        <button class="cover" type="button" @click="openDialog" :aria-label="'Ver ' + cert.nombre">
            <img
                v-if="cert.imagen"
                :src="thumbUrl"
                :alt="cert.nombre"
                loading="lazy"
            />
            <Icon v-else name="line-md:star" size="36" color="var(--accent-2)"/>
        </button>
        <h2>{{ cert.nombre }}</h2>
        <p v-if="cert?.escuela?.nombre">{{ cert.escuela.nombre }}</p>
        <div class="tags">
          <AptitudesList
            :key="(cert.nombre as string)"
            :aptitudes="cert.aptitudes"
            :max="3"
          />
        </div>
        <span class="links">
        <button
            v-if="cert.imagen"
            type="button"
            class="ver-cert"
            @click="openDialog"
        >
            Ver certificado →
        </button>
        </span>

        <dialog ref="dialogRef" class="cert-dialog" @click.self="closeDialog">
            <button class="dialog-close" type="button" @click="closeDialog" title="Cerrar">
                <Icon name="line-md:close" size="18" color="var(--muted)"/>
            </button>
            <div class="dialog-body">
                <h3>{{ cert.nombre }}</h3>
                <p v-if="cert?.escuela?.nombre" class="dialog-school">{{ cert.escuela.nombre }}</p>
                <img
                    v-if="cert.imagen"
                    :src="cert.imagen"
                    :alt="cert.nombre"
                    loading="lazy"
                />
            </div>
        </dialog>
    </article>
</template>

<script setup lang="ts">
import { Certificado } from '~/server/entities/certificados/Certificados.entity'

const props = defineProps<{
  cert: Certificado
}>()

const dialogRef = useTemplateRef<HTMLDialogElement>('dialogRef')

const thumbUrl = computed(() => {
  const img = props.cert.imagen
  if (!img) return ''
  if (img.includes('res.cloudinary.com')) {
    return img.replace('/upload/', '/upload/w_400,h_280,c_fill,q_60/')
  }
  return img
})

const openDialog = () => {
  dialogRef.value?.showModal()
}

const closeDialog = () => {
  dialogRef.value?.close()
}

const onEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeDialog()
}

onMounted(() => window.addEventListener('keydown', onEscape))
onUnmounted(() => window.removeEventListener('keydown', onEscape))
</script>

<style scoped>
.cover {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 140px;
    width: 100%;
    border-radius: 12px;
    background-image: var(--cover-grad);
    border: 1px solid var(--line);
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    transition: border-color 200ms;
}

.cover:hover {
    border-color: var(--accent);
}

.cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: 250ms;
}

.cover:hover img {
    opacity: 1;
    transform: scale(1.03);
}

h2 {
    font-size: 20px;
    background: none;
    -webkit-background-clip: initial;
    background-clip: initial;
    color: var(--text);
    font-weight: 600;
}

p {
    font-size: 14px;
    color: var(--muted);
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.links {
    display: flex;
    margin-top: auto;
}

.ver-cert {
    font-size: 13px;
    font-weight: 500;
    color: var(--accent-2);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    transition: 200ms;
}

.ver-cert:hover {
    text-decoration: underline;
}

.cert-dialog {
    position: fixed;
    inset: 0;
    margin: auto;
    width: min(860px, 92vw);
    max-height: 88vh;
    border: 1px solid var(--line);
    border-radius: 20px;
    background: var(--ink);
    color: var(--text);
    padding: 24px;
}

.cert-dialog::backdrop {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.dialog-close {
    position: absolute;
    top: 16px;
    right: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--surface);
    cursor: pointer;
    transition: 200ms;
}

.dialog-close:hover {
    border-color: var(--accent);
}

.dialog-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: calc(88vh - 48px);
    overflow-y: auto;
}

.dialog-body h3 {
    font-family: "Space Grotesk", sans-serif;
    font-size: 22px;
    font-weight: 600;
    margin: 0;
}

.dialog-school {
    color: var(--muted);
    font-size: 14px;
}

.dialog-body img {
    width: 100%;
    border-radius: 12px;
    border: 1px solid var(--line);
}
</style>
