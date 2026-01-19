export default defineNuxtRouteMiddleware(async ()=> {
    const website = useWebsiteStore()
    const { user } = storeToRefs(website)
    
    const session = useUserSession()

    if (!session.loggedIn.value) {
        await session.fetch()
        
        if (!session.loggedIn.value) {
            user.value = undefined
            return navigateTo('/login')
        }
    }

    user.value = session.user
})