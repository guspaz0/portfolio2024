// server/api/upload.ts
import { createRouter, defineEventHandler, readFormData } from 'h3';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { v2 as cloudinary } from 'cloudinary'

export default defineEventHandler(async (event) => {
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