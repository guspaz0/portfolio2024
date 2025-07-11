import type { Repository } from 'typeorm';
import { Categorias } from './Categorias.entity';
import { getRepository } from '#typeorm';

class CategoriasService {
  private repo: Repository<Categorias>;

  constructor() {this.initialize();}

  private async initialize() {
    this.repo = await getRepository(Categorias);
  }

  async createCategoria(categoria: Categorias): Promise<Categorias> {
    const entity = this.repo.create(categoria)
    const result = await this.repo.save(entity);
    if (!result.id) {
      throw new Error('Categoria not created');
    }
    return result;
  }
}

export default new CategoriasService()
