import { Proyecto } from "./Proyectos.entity";
import Prisma from '~/lib/prisma'

class ProyectoService {
  private repo;

  async findAll(): Promise<Proyecto[] | undefined> {
    try {
        return await this.repo.find();
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number): Promise<Proyecto | undefined> {
    return await this.repo.findOneByOrFail({ id });
  }
}

export default new ProyectoService();
