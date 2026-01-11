import { Certificado } from "./Certificados.entity";
import prisma from '~/lib/prisma'

class CertificadosService {
  constructor(private repo = prisma.certificados){}

  async findAll(): Promise<Certificado[]> {
    return await this.repo.findMany();
  }
  // async create(certificado: Certificado): Promise<Certificado> {
  //   return await this.repo.create({
  //     data: certificado,
  //   });
  // }

  async findById(id: number): Promise<Certificado | undefined> {
    return await this.repo.findUniqueOrThrow({ where: { id } });
  }

}

export default new CertificadosService();
