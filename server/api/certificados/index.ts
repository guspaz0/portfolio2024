// server/api/upload.ts
import { createRouter, defineEventHandler } from 'h3';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { v2 as cloudinary } from 'cloudinary'

const router = createRouter();

router.post('/', defineEventHandler(async (event) => {
    const files = event.node.req.files;
    if (!files || !files.certificate) {
        return { success: false, message: 'No file uploaded' };
    }

    const tempPath = `${tmpdir()}/${files.certificate.name}`;
    writeFileSync(tempPath, files.certificate.data);
    // cloudinary.uploader
    // .upload("my_image.jpg", { folder: 'certificados' })
    // .then(result => console.log(result));

    return { success: true, message: 'File uploaded successfully' };
}));

export default router;