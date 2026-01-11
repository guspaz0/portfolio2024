import { useWebsiteStore } from '~/stores/perfiles'

export default defineNuxtRouteMiddleware(async () => {
    const website = useWebsiteStore()
    const { authenticated } = storeToRefs(website)
    if (authenticated.value) {
        navigateTo('/dashboard')
    }
})