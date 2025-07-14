import { Escuela } from './Escuelas.entity';
import prisma from '~/lib/prisma'

class EscuelasService {
  private repo;

  async findAll(): Promise<Escuela[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Escuela | undefined> {
    return await this.repo.findOneByOrFail({ id });
  }

}

export default new EscuelasService();
