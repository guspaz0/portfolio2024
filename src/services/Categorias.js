import { CategoriaNotFound } from '../exceptions/Categoria.js';
import {Categoria} from '../models/Categoria.js';
import db from '../data/dataSource.js';

export default {
    findAll(){
        const stmt = db.prepare(`select * from categorias`)
        let Categorias = []
        while (stmt.step()) Categorias.push(new Categoria(...stmt.get()))
        return Categorias
    },
    findOne(id){
        const stmt = db.prepare(`select * from categorias where id = ${id}`)
        if (stmt.step()) return new Categoria(...stmt.get())
        else throw CategoriaNotFound(`Categoria Id: ${id} no encontrada`)
    }
}