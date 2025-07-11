import { Perfiles } from '~/server/entities/perfiles/Perfiles.entity';
import { getRepository } from '#typeorm'

export default defineEventHandler(async (event) => {
  // para cuando se hace una solicitud con /${id} parametros De ruta
  const repo = await getRepository(Perfiles);
  try {
    const id = getRouterParam(event, 'id');
    //if (id && isNaN(+id)) throw new Error('ID no válido');
    return await repo.findOne({
      where: { id: +id },
      relations: {
        experiencias: true,
        aptitudes: true,
        certificados: {
          escuela: true,
          aptitudes: true
        },
        proyectos: true
      }
    });
  } catch (error: any) {
    console.error(error)
    throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
  }
})
