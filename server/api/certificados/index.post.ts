// server/api/upload.ts
import { defineEventHandler, readFormData } from 'h3';
import { v2 as cloudinary } from 'cloudinary'
import certificadosService from '~/server/entities/certificados/certificados.service';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;

    const body = await readFormData(event);
    const imagen = body.get('imagen')
    const nombre = body.get('nombre')
    const fecha = body.get('fecha')
    if (!imagen) {
        return { success: false, message: 'No file uploaded' };
    }
    cloudinary.uploader
    .upload(imagen as File, { folder: 'certificados' })
    .then(result => console.log(result));

    return { success: true, message: 'File uploaded successfully' };
});