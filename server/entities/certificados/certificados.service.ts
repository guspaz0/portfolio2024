import { Certificado } from "./Certificados.entity";
import prisma from '~/lib/prisma'

class CertificadosService {
  private repo;

  async findAll(): Promise<Certificado[]> {
    return await this.repo.find();
  }
  async create(certificado: Certificado): Promise<Certificado> {
    return await this.repo.save(certificado);
  }

  async findById(id: number): Promise<Certificado | undefined> {
    return await this.repo.findOneByOrFail({ id });
  }

}

export default new CertificadosService();
