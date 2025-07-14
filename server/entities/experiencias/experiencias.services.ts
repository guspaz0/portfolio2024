import { Experiencia } from './Experiencias.entity';
import prisma from '~/lib/prisma'

class ExperienciasService {
  private repo = prisma.experiencias;

  async findAll(): Promise<Experiencia[] | undefined> {
    try {
      const experiences = await this.repo.findMany();
      return experiences;
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      await prisma.$disconnect();
    }

  }

  async findOne(id: number): Promise<Experiencia | undefined> {
    try {
      const experience = await this.repo.findFirst({ where: { id } });
      return experience;
    } catch (error) {
      console.error("Error fetching experience:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new ExperienciasService();
