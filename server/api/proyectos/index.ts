import { v2 as cloudinary } from 'cloudinary'
import ProyectoService from '~/server/entities/proyectos/Proyecto.service';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;

    switch(method) {
        case 'POST':
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
        case 'GET':
            return await ProyectoService.findAll()
        default:
            break
    }
});