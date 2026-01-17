import prisma from '~/lib/prisma'
import { Aptitud } from './Aptitudes.entity';
import { AptitudRequestDto } from './aptitudesRequest.dto';
import { v2 as cloudinary } from 'cloudinary'
import { useParseFormData } from '~/server/utils/parseFormData';
import { ApiResponseDto } from '~/server/utils/apiResponseDto';
import { CloudinaryUploadedFile } from '~/server/types/CloudinaryUploadedFile';


class AptitudesService {
	constructor(
		private repo = prisma.aptitudes,
		private repoView = prisma.aptitudes_view
	){}

	async findAll(): Promise<Aptitud[]> {
		return await this.repo.findMany({ include: { categoria: true } });
	}

	async getAptitudeById(id: number): Promise<Partial<Aptitud> | null> {
		return await this.repo.findUniqueOrThrow({ 
			where: { id },
			include: { categoria: true } 
		});
	}

	async getViewById(id: number) {
		return await this.repoView.findFirst({ where: { id } })
	}

	async save(data: FormData) {
		try {
			const { dto } = useParseFormData(AptitudRequestDto, data)
			const imagen = dto.imagen as File
			const buffer = Buffer.from(await imagen.arrayBuffer());

			// Upload the image to Cloudinary
			const uploadResult = await new Promise((resolve, reject) => {
				cloudinary.uploader.upload_stream({ 
					resource_type: 'image', 
					folder: 'aptitudes',
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
					categoria_id: dto.categoria
				}
			})
			return new ApiResponseDto(true, await this.getViewById(saved.id))
		} catch (e) {
			throw e
		}
	}

}

export default new AptitudesService();
