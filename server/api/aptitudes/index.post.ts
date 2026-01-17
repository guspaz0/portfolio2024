import aptitudesService from '~/server/entities/aptitudes/aptitudes.service';

export default defineEventHandler(async (event) => {
    try {
        const body = await readFormData(event);

        console.log(body.constructor.prototype)

        return await aptitudesService.save(body)
    } catch (error) {
        throw createError({ statusCode: 404, message: (error as Error).message })
    }
});