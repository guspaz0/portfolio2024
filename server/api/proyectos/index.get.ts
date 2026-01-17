import { v2 as cloudinary } from 'cloudinary'
import ProyectoService from '~/server/entities/proyectos/Proyecto.service';

export default defineEventHandler(async (event) => {
    try {
        return await ProyectoService.findAll()
    } catch (error) {
        throw createError({ statusCode: 404, message: (error as Error).message })
    }
});