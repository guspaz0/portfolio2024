import { defineEventHandler, readFormData } from 'h3';
import certificadosService from '~/server/entities/certificados/certificados.service';

export default defineEventHandler(async (event) => {
    try {
        const body = await readFormData(event);

        return await certificadosService.save(body)
    } catch (error) {
        throw createError({ statusCode: 404, message: (error as Error).message })
    }
});