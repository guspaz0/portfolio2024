import { Perfil } from '~/server/types/Perfil';
import perfilesService from '~/server/entities/perfiles/perfiles.service';

export default defineEventHandler(async (event: any) => {

  try {
    return await perfilesService.findAll() as Perfil[]
  } catch (error: any) {
    throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
  }
})
