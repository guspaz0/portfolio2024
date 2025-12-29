import { Perfil } from '~/server/types/Perfil';
import perfilesService from '~/server/entities/perfiles/perfiles.service';

export default defineEventHandler(async (event) => {

  try {
    const id = getRouterParam(event, 'id');
    if (id && isNaN(+id)) throw new Error('ID no válido');
    return await perfilesService.getPerfil(+id as number) as Perfil
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
    /* 
      genera una vista en el frontend, mostrando el error.
      throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
    */
  }
})
