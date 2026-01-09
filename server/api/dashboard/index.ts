
export default defineEventHandler(async (event: any) => {
    try {
        const { email } = event.context.auth
        
    } catch (error: any) {
        console.log("Error /api/login server event : \n",error)
        throw new Error(error)
        //throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
    }
})
