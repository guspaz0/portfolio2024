// server/api/upload.ts
import { v2 as cloudinary } from 'cloudinary'
import aptitudesService from '~/server/entities/aptitudes/aptitudes.service';

export default defineEventHandler(async (event) => {
    try {
        const body = await readFormData(event);
        console.log(body)
        return 'vacio'
    } catch (error) {
        throw createError({ statusCode: 404, message: (error as Error).message })
    }
});