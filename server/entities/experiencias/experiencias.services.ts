import { Experiencia } from './Experiencias.entity';
import Prisma from '~/lib/prisma'

class ExperienciasService {
  private repo = Prisma.experiencias;

  async findAll(): Promise<Experiencia[] | undefined> {
    try {
      const experiences = await this.repo.findMany();
      return experiences;
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      await Prisma.$disconnect();
    }

  }

  async findOne(id: number): Promise<Experiencia | undefined> {
    try {
      const experience = await this.repo.findFirst({ where: { id } });
      return experience;
    } catch (error) {
      console.error("Error fetching experience:", error);
    } finally {
      await Prisma.$disconnect();
    }
  }
}

export default new ExperienciasService();
