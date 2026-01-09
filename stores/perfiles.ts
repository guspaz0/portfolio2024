import { defineStore } from "pinia";
import type { Perfil } from "~/server/types/Perfil";
import { ref } from 'vue'

export const useWebsiteStore = defineStore('portfolioStore', {
    state: () => ({
        perfiles: ref<Perfil[]>([]),
        currentProfile: ref<number>(1),
        authenticated: ref<boolean>(false),
        darkMode: ref<boolean>(false)
    }),
    actions: {
        async fetch() {
            this.perfiles.values = await $fetch('/api/perfiles')
        }
    }
})

