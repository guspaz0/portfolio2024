import type { Perfil } from "~/server/types/Perfil";
import type { Certificado } from "~/server/entities/certificados/Certificados.entity";
import type { Aptitud } from "~/server/entities/aptitudes/Aptitudes.entity";
import type { Escuela } from "~/server/entities/escuelas/Escuelas.entity";
import type { Proyecto } from "~/server/entities/proyectos/Proyectos.entity";
import type { Categoria } from "~/server/entities/categorias/Categorias.entity";
import type { User } from "#auth-utils";

export const useWebsiteStore = defineStore('portfolioStore', {
    state: () => ({
        perfiles: ref<Perfil[]>([]),
        currentProfile: ref<number>(1),
        darkMode: ref<boolean>(false),
        certificados: ref<Certificado[]>([]),
        aptitudes: ref<Aptitud[]>([]),
        escuelas: ref<Escuela[]>([]),
        proyectos: ref<Proyecto[]>([]),
        categorias: ref<Categoria[]>([]),
        entitiesCount: ref<Record<string, number>>({}),
        user: ref<User | undefined>()
    }),
    actions: {
        async fetchPerfiles() {
            this.perfiles = await $fetch('/api/perfiles')
        },
        async fetchCertificados() {
            this.certificados = await $fetch('/api/certificados')
        },
        async fetchAptitudes() {
            this.aptitudes = await $fetch('/api/aptitudes')
        },
        async fetchEscuelas() {
            this.escuelas = await $fetch('/api/escuelas')
        },
        async fetchProyectos() {
            this.proyectos = await $fetch('/api/proyectos')
        },
        async fetchCountEntities() {
            this.entitiesCount = await $fetch('/api/dashboard')
        },
        async fetchCategorias() {
            this.categorias = await $fetch('/api/categorias')
        }
    }
})