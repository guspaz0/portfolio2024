import { getRepository } from '#typeorm';
import { Aptitudes } from './Aptitudes.entity';
import type { Repository } from 'typeorm';

class AptitudesService {
  private repo: Repository<Aptitudes>;

  constructor() { this.initialize()}

  private async initialize() {
    this.repo = await getRepository(Aptitudes);
  }

  async createAptitude(aptitude: Aptitudes): Promise<Aptitudes> {
    const entity = this.repo.create(aptitude);
    return await this.repo.save(entity);
  }

  async getAptitudeById(id: number): Promise<Aptitudes | null> {
    return await this.repo.findOneBy({ id });
  }

  async updateAptitude(id: number, aptitude: Aptitudes): Promise<Aptitudes | null> {
    const entity = this.repo.create(aptitude)
    const result = await this.repo.update({ id }, aptitude);
    if (!result.affected) {
      throw new Error('Aptitude not found');
    }
    return await this.repo.save(entity);
  }

  async deleteAptitude(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

export default new AptitudesService();
