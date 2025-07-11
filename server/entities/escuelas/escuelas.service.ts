import { Repository } from 'typeorm';
import { Escuelas } from './Escuelas.entity';
import { getRepository } from '#typeorm';

class EscuelasService {
  private repo: Repository<Escuelas>;
  constructor() {this.initialize();}

  private async initialize() {
    this.repo = await getRepository(Escuelas);
  }

  async findAll(): Promise<Escuelas[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Escuelas | undefined> {
    return await this.repo.findOneByOrFail({ id });
  }

  async create(data: Partial<Escuelas>): Promise<Escuelas> {
    return this.repo.save(data);
  }

  async update(id: number, data: Partial<Escuelas>): Promise<Escuelas | undefined> {
    const escuela = await this.repo.findOneBy({ id });
    if (!escuela) return undefined;
    await this.repo.update(id, data);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

export default new EscuelasService();
