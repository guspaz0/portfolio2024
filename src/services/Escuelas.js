import { EscuelaNotFound } from "../exceptions/Escuela.js";
import {Escuela} from "../models/Escuela.js";
import db from "../data/dataSource.js";

export default {
    findAll: function (){
        const stmt = db.prepare(`select * from escuelas`)
        let Escuelas = [];
        while(stmt.step()) Escuelas.push(new Escuela(...stmt.get()))
        stmt.free()
        return Escuelas
    },
    findOne: function(id) {
        const stmt = db.prepare(`select * from escuelas where id = ${id}`)
        let entity;
        if (stmt.step()) {
            entity = new Escuela(...stmt.get())
            stmt.free()
        } else {
            stmt.free()
            throw new EscuelaNotFound(`La escuela id: ${id} no se encontró`)
        }
        return entity
    },
    findByPerfil: function(id){

    }
}