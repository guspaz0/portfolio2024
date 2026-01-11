import { Escuela } from './Escuelas.entity';
import prisma from '~/lib/prisma'

class EscuelasService {
  constructor(private repo = prisma.escuelas){}

  async findAll(): Promise<Escuela[]> {
    return await this.repo.findMany();
  }

  async findOne(id: number): Promise<Escuela | undefined> {
    return await this.repo.findUniqueOrThrow({ where: { id } });
  }

}

export default new EscuelasService();
