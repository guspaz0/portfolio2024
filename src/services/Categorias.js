import data from '../data/categorias.js';
import {Categoria} from '../models/Categoria.js';

export default {
    findAll(){
        return data.map(cat =>
            new Categoria(cat.id, cat.nombre)
        )
    },
    findOne(id){
        const cat = data.find(cat => +cat.id === +id)
        return new Categoria(cat.id,cat.nombre)
    }
}