import escuelasService from "~/server/entities/escuelas/escuelas.service"

export default defineEventHandler(async (event: any) => {
  // para cuando se hace una solicitud con /${id} parametros De ruta
  try {
    return await escuelasService.findAll()
  } catch (error: any) {
    throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
  }
})
