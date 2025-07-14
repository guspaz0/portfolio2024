import { Perfiles } from '~/server/types/Perfil';
import perfilesService from '~/server/entities/perfiles/perfiles.service';

export default defineEventHandler(async (event: any) => {
  // para cuando se hace una solicitud con /${id} parametros De ruta

  try {
    return await perfilesService.findAll()
  } catch (error: any) {
    throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
  }
})
