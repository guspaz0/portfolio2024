import categorias from '../data/categorias.js';
import { CategoriaNotFound } from '../exceptions/Categoria.js';
import {Categoria} from '../models/Categoria.js';

export default {
    findAll(){
        return categorias.map(categoria => new Categoria(...categoria))
    },
    findOne(id){
        const categoria = new Categoria(...categorias.find(([catId]) => catId === id))
        if (categoria) return categoria
        else throw CategoriaNotFound(`Categoria Id: ${id} no encontrada`)
    }
}