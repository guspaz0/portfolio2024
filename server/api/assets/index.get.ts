import { Assets } from '~/server/types/contacto';

export default defineEventHandler(async (event) => {
  // para cuando se hace una solicitud con /${id} parametros De ruta
  try {
    return Assets
  } catch (error: any) {
    throw createError({ statusCode: 404, message: 'recurso no encontrado' })
  }
})
