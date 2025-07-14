import { Experiencias } from '~/server/entities/experiencias/Experiencias.entity';
import experienciasService from '~/server/entities/experiencias/experiencias.services';

export default defineEventHandler(async (event: any) => {
  // para cuando se hace una solicitud con /${id} parametros De ruta
  try {
    return await experienciasService.findAll()
  } catch (error: any) {
    throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
  }
})
