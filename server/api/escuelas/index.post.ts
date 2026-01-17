import { defineEventHandler, readFormData } from 'h3';
import escuelasService from '~/server/entities/escuelas/escuelas.service';

export default defineEventHandler(async (event) => {
    try {
        const body = await readFormData(event);

        return await escuelasService.save(body)
    } catch (error) {
        throw createError({ statusCode: 404, message: (error as Error).message })
    }
});