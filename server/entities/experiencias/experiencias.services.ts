import { Experiencia } from './Experiencias.entity';
import prisma from '~/lib/prisma'

class ExperienciasService {
  private repo = prisma.experiencias;

  async findAll() {
    try {
      return await this.repo.findMany();
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.repo.findFirst({ where: { id } });
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  }
}

export default new ExperienciasService();
