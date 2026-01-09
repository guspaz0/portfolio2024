import { useWebsiteStore } from '~/stores/perfiles'

export default defineNuxtRouteMiddleware((middleware) => {
    const website = useWebsiteStore()
    const { authenticated } = storeToRefs(website)
    if (authenticated) {
        navigateTo('/dashboard')
    }
})