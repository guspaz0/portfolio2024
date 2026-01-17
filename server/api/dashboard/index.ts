import dashboardService from "~/server/entities/dashboard/dashboard.service"

export default defineEventHandler(async (event: any) => {
    try {
        //const auth = event.context.auth
        return await dashboardService.countAll()
    } catch (error: any) {
        console.log("Error /api/login server event : \n",error)
        throw new Error(error)
        //throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
    }
})
