import ProyectoService from "~/server/entities/proyectos/Proyecto.service";

export default defineEventHandler(async (event) => {
    try {
        const body = await readFormData(event);

        return await ProyectoService.save(body)
    } catch (error) {
        throw createError({ statusCode: 404, message: (error as Error).message })
    }
});