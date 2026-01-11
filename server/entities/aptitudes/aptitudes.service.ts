import prisma from '~/lib/prisma'
import { Aptitud } from './Aptitudes.entity';

class AptitudesService {
  private repo = prisma.aptitudes;

  async findAll(): Promise<Aptitud[]> {
    return await this.repo.findMany();
  }

  async getAptitudeById(id: number): Promise<Partial<Aptitud> | null> {
    return await this.repo.findUniqueOrThrow({ where: { id } });
  }

}

export default new AptitudesService();
