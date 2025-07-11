import { Repository } from "typeorm";
import { Perfiles } from "./Perfiles.entity";
import { getRepository } from '#typeorm';

class PerfilesService {
  private repo: Repository<Perfiles>;

  constructor() {this.initialize();}

  private async initialize() {
    this.repo = await getRepository(Perfiles);
  }

  async findAll(): Promise<Perfiles[] | undefined> {
    try {
      return await this.repo.find({
        relations: {
          experiencias: true,
          aptitudes: true,
          certificados: {
            escuela: true,
            aptitudes: true
          },
          proyectos: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async createPerfil(data: Perfiles): Promise<Perfiles> {
    return await this.repo.save(data);
  }

  async updatePerfil(id: number, data: Perfiles): Promise<Perfiles> {
    const perfil = await this.repo.findOneBy({ id });
    if (!perfil) throw new Error('Perfil no encontrado');
    return await this.repo.save({ ...perfil, ...data });
  }

  async deletePerfil(id: number): Promise<void> {
    const perfil = await this.repo.findOneBy({ id });
    if (!perfil) throw new Error('Perfil no encontrado');
    await this.repo.remove(perfil);
  }

  async getPerfil(id: number): Promise<Perfiles | null> {
    return await this.repo.findOneOrFail({
      where: { id },
      relations: {
        experiencias: true,
        aptitudes: true,
        certificados: {
          escuela: true,
          aptitudes: true
        },
        proyectos: {
          aptitudes: true
        }
      }
    });
  }
}

export default new PerfilesService();
