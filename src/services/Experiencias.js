import Experiencia from '../models/Experiencia.js'
import { ExperienciaNotFound } from "../exceptions/Experiencia.js";
import db from '../data/dataSource.js'

export default {
    findAll: function (){
        let stmt;
        try {
            stmt = db.prepare(`select * from experiencias`)
            let Experiencias = []
            while (stmt.step()) Experiencias.push(new Experiencia(...stmt.get()))
            return Experiencias.sort((a,b) => (b.fecha - a.fecha))
        } catch (e) {
            throw e
        } finally {
            stmt.free();
        }
    },
    findOne(id) {
        const stmt = db.prepare(`select * from experiencias where id = ${id}`)
        if (stmt.step()) return new Experiencia(...stmt.get())
        else throw new ExperienciaNotFound(`La expenriencia id: ${id} no se encontró`)
    },
    findByPerfil(perfId){
        const stmt = db.prepare(`select e.* from experiencias e 
            left join experiencias_perfil ep on e.id = ep.experiencia_id
            left join perfiles p on p.id = ep.perfil_id
            where p.id = ${perfId}`)
        let Experiencias = []
        while (stmt.step()) Experiencias.push(new Experiencia(...stmt.get()))
        return Experiencias.sort((a,b) => (b.fecha - a.fecha))
    }
}