import { ProyectoRequestDto } from "./ProyectoForm.dto";
import { Proyecto } from "./Proyectos.entity";
import prisma from '~/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryUploadedFile } from "~/server/types/CloudinaryUploadedFile";

class ProyectoService {
  constructor(private repo = prisma.proyectos){}

  async findAll(): Promise<Proyecto[] | undefined> {
    try {
        return await this.repo.findMany();
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number): Promise<Proyecto | undefined> {
    return await this.repo.findUniqueOrThrow({ where: { id } });
  }

  async save(data: FormData) {
    try {
      const { dto } = useParseFormData(ProyectoRequestDto, data)
      const imagen = dto.imagen as File
      const buffer = Buffer.from(await imagen.arrayBuffer());

      // Upload the image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ 
          resource_type: 'image', 
          folder: 'proyectos',
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
          descripcion: dto.descripcion,
          repositorio: dto.repositorio,
          deploy: dto.deploy,
          fecha: new Date(dto.fecha).toISOString(),
          perfiles: {
            create: dto.perfiles.map((id) => ({ perfil: { connect: { id }} }))
          },
          aptitudes: {
            create: dto.aptitudes.map((id) => ({ aptitud: { connect: { id }} }))
          },
        }
      })
      return new ApiResponseDto(true, await this.findOne(saved.id))
    } catch (e) {
      throw e
    }
  }
}

export default new ProyectoService();
