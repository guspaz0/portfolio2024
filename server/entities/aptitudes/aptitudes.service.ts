import Prisma from '~/lib/prisma'
import { Aptitud } from './Aptitudes.entity';

class AptitudesService {
  private repo = Prisma.aptitudes;

  async getAptitudeById(id: number): Promise<Partial<Aptitud> | null> {
    return await this.repo.findUniqueOrThrow({ where: { id } });
  }

}

export default new AptitudesService();
