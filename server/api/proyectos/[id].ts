import escuelasService from '~/server/entities/escuelas/escuelas.service';
import ProyectoService from '~/server/entities/proyectos/Proyecto.service';
import type { Proyecto } from '~/server/entities/proyectos/Proyectos.entity';

export default defineEventHandler(async (event): Promise<Proyecto | undefined> => {

  try {
    const id = getRouterParam(event, 'id');
    if (id && isNaN(+id)) throw new Error('ID no válido');
    return await ProyectoService.findOne(+id as number);
  } catch (error: any) {
    console.error(error)
    throw createError({ statusCode: 404, message: 'Escuela no encontrado' })
  }
})
