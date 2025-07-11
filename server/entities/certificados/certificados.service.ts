import { Repository } from "typeorm";
import { Certificados } from "./Certificados.entity";
import { getRepository } from '#typeorm';

class CertificadosService {
  private repo: Repository<Certificados>;

  constructor() {this.initialize();}

  private async initialize() {
    this.repo = await getRepository(Certificados);
  }

  async findAll(): Promise<Certificados[]> {
    return await this.repo.find();
  }

  async create(certificado: Certificados): Promise<Certificados> {
    return await this.repo.save(certificado);
  }

  async findById(id: number): Promise<Certificados | undefined> {
    return await this.repo.findOneByOrFail({ id });
  }

  async update(id: number, certificado: Certificados): Promise<Certificados | undefined> {
    const result = await this.repo.update(id, certificado);
    if (!result.affected) {
      throw new Error('Certificado not found');
    }
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

export default new CertificadosService();
