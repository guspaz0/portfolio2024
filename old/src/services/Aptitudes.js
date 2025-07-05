import {Aptitud} from "../models/Aptitud.js";
import { AptitudNotFound } from "../exceptions/Aptitud.js";
import db from "../data/dataSource.js";

export default {
    findAll: function () {
        const stmt = db.prepare(`select * from aptitudes`)
        let Aptitudes = []
        while (stmt.step()) Aptitudes.push(new Aptitud(...stmt.get()))
        stmt.free()
        return Aptitudes
    },
    findOne: function (id) {
        const stmt = db.prepare(`select * from aptitudes where id = ${id}`)
        if (stmt.step()) return new Aptitud(...stmt.get())
        else throw new AptitudNotFound(`La Aptitud Id: ${id} no se encuentra`);
    },
    findByPerfil: function (perfId) {
        const stmt = db.prepare(`select a.* from aptitudes a 
            left join aptitudes_perfil ap on a.id = ap.aptitud_id
            left join perfiles p on p.id = ap.perfil_id
            where p.id = ${perfId}`)
        let Aptitudes = []
        while (stmt.step()) Aptitudes.push(new Aptitud(...stmt.get()))
        stmt.free()
        return Aptitudes
    },
    findByCertificate: function (cert_id) {
        const stmt = db.prepare(`select a.* from aptitudes a 
            left join certificados_aptitudes ca on a.id = ca.aptitud_id
            left join certificados c on c.id = ca.certificado_id
            where c.id = ${cert_id}`)
        let Aptitudes = []
        while (stmt.step()) Aptitudes.push(new Aptitud(...stmt.get()))
        stmt.free()
        return Aptitudes
    },
    findByProject: function (project_id){
        const stmt = db.prepare(`select a.* from aptitudes a 
            left join proyectos_aptitudes pa on a.id = pa.aptitud_id
            left join proyectos p on p.id = pa.proyecto_id
            where p.id = ${project_id}`)
        let Aptitudes = []
        while (stmt.step()) Aptitudes.push(new Aptitud(...stmt.get()))
        stmt.free()
        return Aptitudes
    },
    countProject: function (apt_id){
        const count = db.exec(`select count() from proyectos p
            join proyectos_aptitudes pa on p.id = pa.proyecto_id 
            join aptitudes a on a.id = pa.aptitud_id 
            where a.id = ${apt_id}`)
        return count[0].values[0][0]
    },
    countCertificados: function (apt_id) {
        const count = db.exec(`select count() from certificados c
            join certificados_aptitudes ca on c.id = ca.certificado_id 
            join aptitudes a on a.id = ca.aptitud_id 
            where a.id = ${apt_id}`)
        return count[0].values[0][0]
    }
}