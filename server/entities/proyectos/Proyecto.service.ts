import { Repository } from "typeorm";
import { Proyectos } from "./Proyectos.entity";
import { getRepository } from '#typeorm';

class ProyectoService {
  private repo: Repository<Proyectos>;

  constructor() {this.initialize();}

  private async initialize() {
    this.repo = await getRepository(Proyectos);
  }

  async findAll(): Promise<Proyectos[] | undefined> {
    try {
        return await this.repo.find();
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number): Promise<Proyectos | undefined> {
    return await this.repo.findOneByOrFail({ id });
  }
}

export default new ProyectoService();
