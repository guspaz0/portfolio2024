import { Perfil } from '~/server/types/Perfil';
import perfilesService from '~/server/entities/perfiles/perfiles.service';

export default defineEventHandler(async (event: any) => {

  try {
    return await perfilesService.findAll() as Perfil[]
  } catch (error: any) {
    console.log("Error /api/perfiles server event : \n",error)
    throw new Error(error)
    //throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
  }
})
