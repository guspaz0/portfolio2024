import type { Escuela } from '~/server/entities/escuelas/Escuelas.entity';
import escuelasService from '~/server/entities/escuelas/escuelas.service';

export default defineEventHandler(async (event): Promise<Escuela | undefined> => {

    try {
        const id = getRouterParam(event, 'id');
        if (id && isNaN(+id)) throw new Error('ID no válido');
        return await escuelasService.findOne(+id as number);
    } catch (error: any) {
        console.error(error)
        throw createError({ statusCode: 404, message: 'Escuela no encontrado' })
    }
})
