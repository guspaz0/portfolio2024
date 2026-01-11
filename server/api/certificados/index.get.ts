// server/api/upload.ts
import { defineEventHandler, readFormData } from 'h3';
import { v2 as cloudinary } from 'cloudinary'
import certificadosService from '~/server/entities/certificados/certificados.service';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    return await certificadosService.findAll()
});