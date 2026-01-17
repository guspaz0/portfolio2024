import { Escuela } from './Escuelas.entity';
import prisma from '~/lib/prisma'
import { EscuelaRequestDto } from './EscuelaRequest.dto';
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryUploadedFile } from '~/server/types/CloudinaryUploadedFile';

class EscuelasService {
  constructor(private repo = prisma.escuelas){}

  async findAll(): Promise<Escuela[]> {
    return await this.repo.findMany();
  }

  async findOne(id: number): Promise<Escuela | undefined> {
    return await this.repo.findUniqueOrThrow({ where: { id } });
  }

  async save(data: FormData) {
      const { dto } = useParseFormData(EscuelaRequestDto, data)
      const imagen = dto.imagen as File
      const buffer = Buffer.from(await imagen.arrayBuffer());

      // Upload the image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ 
          resource_type: 'image', 
          folder: 'escuelas',
          name: imagen.name
        }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }).end(buffer);
      }) as CloudinaryUploadedFile
      const saved = await this.repo.create({
        data: {
          nombre: dto.nombre,
          imagen: uploadResult.url.split('/').pop(),
        }
      })
      return new ApiResponseDto(true, await this.findOne(saved.id))
  }

}

export default new EscuelasService();
