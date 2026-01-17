import { CloudinaryUploadedFile } from "~/server/types/CloudinaryUploadedFile";
import { ApiResponseDto } from "~/server/utils/apiResponseDto";
import { useParseFormData } from "~/server/utils/parseFormData";
import { AptitudRequestDto } from "../aptitudes/aptitudesRequest.dto";
import { Certificado } from "./Certificados.entity";
import { v2 as cloudinary } from 'cloudinary'
import prisma from '~/lib/prisma'
import { CertificadoRequestDto } from "./certificadosRequestDto";

class CertificadosService {
  constructor(
    private repo = prisma.certificados,
    private repow = prisma.certificados_view
  ){}

  async findAll() {
    return await this.repo.findMany({ include: { escuela: true } });
  }
  async save(data: FormData) {
    try {
      const { dto } = useParseFormData(CertificadoRequestDto, data)
      const imagen = dto.imagen as File
      const buffer = Buffer.from(await imagen.arrayBuffer());

      // Upload the image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ 
          resource_type: 'image', 
          folder: 'certificados',
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
          fecha: new Date(dto.fecha).toISOString(),
          escuela_id: dto.escuela,
          perfiles: {
            create: dto.perfiles.map((id) => ({ perfil: { connect: { id }} }))
          },
          aptitudes: {
            create: dto.aptitudes.map((id) => ({ aptitud: { connect: { id }} }))
          },
        }
      })
      return new ApiResponseDto(true, await this.repo.findUnique({ 
        where: { id: saved.id },
        include: { escuela: true }
      }))
    } catch (e) {
      throw e
    }
  }

  async findById(id: number) {
    return await this.repo.findUniqueOrThrow({ 
      where: { id },
      include: { 
        aptitudes: true, 
        perfiles: true, 
        escuela: true 
      }  
    });
  }

}

export default new CertificadosService();
