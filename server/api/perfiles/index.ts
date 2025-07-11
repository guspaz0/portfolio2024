import { Perfiles } from '~/server/entities/perfiles/Perfiles.entity';
import { getRepository } from '#typeorm';
//import perfilesService from '../../entities/perfiles/perfiles.service';

export default defineEventHandler(async (event: any) => {
  // para cuando se hace una solicitud con /${id} parametros De ruta
  const repo = await getRepository(Perfiles);
  try {
    return await repo.find({
      relations: {
        experiencias: true,
        aptitudes: true,
        proyectos: true,
        certificados: {
          escuela: true,
          aptitudes: true
        }
      }
    });
  } catch (error: any) {
    throw createError({ statusCode: 404, message: 'Perfil no encontrado' })
  }
})
