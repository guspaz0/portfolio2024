import { Repository } from 'typeorm';
import { Experiencias } from './Experiencias.entity';
import { getRepository } from '#typeorm';

class ExperienciasService {
  private repo: Repository<Experiencias>;

  constructor() {this.initialize();}

  private async initialize() {
    this.repo = await getRepository(Experiencias);
  }

  async create(data: Partial<Experiencias>): Promise<Experiencias> {
    const newExperience = this.repo.create(data);
    return await this.repo.save(newExperience);
  }

  async findAll(): Promise<Experiencias[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Experiencias | undefined> {
    return await this.repo.findOneByOrFail({ id });
  }

  async update(id: number, data: Partial<Experiencias>): Promise<Experiencias | undefined> {
    const experience = await this.repo.findOneBy({ id });
    if (!experience) return undefined;
    await this.repo.update(id, data);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

export default new ExperienciasService();
