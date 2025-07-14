import { Perfiles } from '~/server/types/Perfil';
import perfilesService from '~/server/entities/perfiles/perfiles.service';

export default defineEventHandler(async (event) => {
  // para cuando se hace una solicitud con /${id} parametros De ruta
  try {
    const id = getRouterParam(event, 'id');
    if (id && isNaN(+id)) throw new Error('ID no válido');
    return await perfilesService.getPerfil(+id as number);
  } catch (error: any) {
    console.error(error)
    throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
  }
})
