import {Proyecto} from "../models/Proyecto.js";
import { Aptitud } from "../models/Aptitud.js";
import { ProyectoNotFound } from "../exceptions/Proyecto.js";
import db from '../data/dataSource.js'

export default {
    findAll: function (){
        const stmt = db.prepare(`select * from proyectos`)
        let Proyectos = []
        while (stmt.step()) Proyectos.push(new Proyecto(...stmt.get()))
        stmt.free()
        return Proyectos
    },
    findOne: function(id) {
        const stmt = db.prepare(`select * from proyectos where id = ${id}`)
        if (stmt.step()) return new Proyecto(...stmt.get())
        else throw new ProyectoNotFound(`El proyecto id: ${id} no se encontró`)
    },
    findProyectosAptitudes: function (project_id){
        const stmt = db.prepare(`select a.* from proyectos p 
            inner join proyectos_aptitudes pa on p.id = pa.proyecto_id
            inner join aptitudes a on a.id = pa.aptitud_id
            where p.id = ${project_id}`)
        let Aptitudes = []
        while (stmt.step()) Aptitudes.push(new Aptitud(...stmt.get()))
        stmt.free()
        return Aptitudes
    },
    findByPerfil: function (perfil_id){
        const stmt = db.prepare(`select p.* from proyectos p 
            inner join proyectos_perfil pp on p.id = pp.proyecto_id
            inner join perfiles pe on pe.id = pp.perfil_id
            where pe.id = ${perfil_id}`)
        let Proyectos = []
        while (stmt.step()) Proyectos.push(new Proyecto(...stmt.get()))
        stmt.free()
        return Proyectos
    },
    countAptitudes: function (project_id){
        const count = db.exec(`select count() from proyectos p 
            join proyectos_aptitudes pa on p.id = pa.proyecto_id
            join aptitudes a on a.id = pa.aptitud_id
            where p.id = ${project_id}`)
        return count[0].values[0][0]
    }
}