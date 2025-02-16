import categorias from '../data/categorias.js';
import {Categoria} from '../models/Categoria.js';

export default {
    findAll(){
        return categorias.map(([id,nombre]) => new Categoria(id, nombre))
    },
    findOne(id){
        return this.findAll().find(cat => cat.id === +id)
    }
}