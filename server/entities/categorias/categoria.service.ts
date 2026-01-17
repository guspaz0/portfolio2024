import { Categoria } from './Categorias.entity';
import prisma from '~/lib/prisma'

class CategoriasService {
  constructor(
    private repo = prisma.categorias
  ){}

  async findAll() {
    return await this.repo.findMany()
  }

}

export default new CategoriasService()
