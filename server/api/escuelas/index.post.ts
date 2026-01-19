import { defineEventHandler, readFormData } from 'h3';
import escuelasService from '~/server/entities/escuelas/escuelas.service';

export default defineEventHandler(async (event) => {
    try {
        const session = await requireUserSession(event, {
            statusCode: 401,
            message: 'Se requiere inicio de session'
        })

        const body = await readFormData(event);

        return await escuelasService.save(body)
    } catch (error) {
        const isDev = import.meta.dev
        throw createError({ 
            statusCode: error.statusCode || 404, 
            message: (error as Error).message,
            stack: isDev
                ? (error as Error).stack 
                : undefined // Only show stack trace in development environment, set to
        })
    }
});