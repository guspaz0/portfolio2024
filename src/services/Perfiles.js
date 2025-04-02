import { PerfilNotFound } from "../exceptions/Perfil.js";
import {Perfil} from "../models/Perfil.js";
import db from '../data/dataSource.js'

export default {
    findAll: function (){
        const stmt = db.prepare(`select * from perfiles`)
        let Perfiles = []
        while (stmt.step()) Perfiles.push(new Perfil(...stmt.get()))
        stmt.free()
        return Perfiles
    },
    findOne: function (id){
        const stmt = db.prepare(`select * from perfiles where id = ${id}`)
        let entity;
        if (stmt.step()) {
            entity = new Perfil(...stmt.get())
            stmt.free()
        } else {
            stmt.free()
            throw new PerfilNotFound(`El Perfil id: ${id} no se encontró`)
        }
        return entity
    }
}