import type { Certificado } from '~/server/entities/certificados/Certificados.entity';
import certificadosService from '~/server/entities/certificados/certificados.service';

export default defineEventHandler(async (event): Promise<Certificado | undefined> => {

    try {
        const id = getRouterParam(event, 'id');
        if (id && isNaN(+id)) throw new Error('ID no válido');
        return await certificadosService.findById(+id as number);
    } catch (error: any) {
        console.error(error)
        throw createError({ statusCode: 404, message: 'Escuela no encontrado' })
    }
})
