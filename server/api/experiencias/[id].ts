import { Experiencia } from '~/server/entities/experiencias/Experiencias.entity';
import experienciasService from '~/server/entities/experiencias/experiencias.services';

export default defineEventHandler(async (event): Promise<Experiencia> => {
  // para cuando se hace una solicitud con /${id} parametros De ruta
  try {
    const id = getRouterParam(event, 'id');
    if (id && isNaN(+id)) throw new Error('ID no válido');
    return await experienciasService.findOne(+id as number);
  } catch (error: any) {
    console.error(error)
    throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
  }
})
