import { Proyecto } from "./Proyectos.entity";
import prisma from '~/lib/prisma'

class ProyectoService {
  constructor(private repo = prisma.proyectos){}

  async findAll(): Promise<Proyecto[] | undefined> {
    try {
        return await this.repo.findMany();
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number): Promise<Proyecto | undefined> {
    return await this.repo.findUniqueOrThrow({ where: { id } });
  }
}

export default new ProyectoService();
