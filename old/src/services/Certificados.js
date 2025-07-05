import {Certificado} from "../models/Certificado.js";
import { CertificadoNotFound } from "../exceptions/Certificado.js";
import db from "../data/dataSource.js";

export default {
    findAll: function (){
        const stmt = db.prepare(`select * from certificados`)
        let Certificados = []
        while (stmt.step()) Certificados.push(new Certificado(...stmt.get()))
        return Certificados
    },
    findOne: function(id) {
        const stmt = db.prepare(`select * from certificados where id = ${id}`)
        if (stmt.step()) return new Certificado(...stmt.get())
        else throw new CertificadoNotFound(`El certificado id: ${id} no se encontró`)
    },
    findByPerfil(perfId) {
        const stmt = db.prepare(`select c.* from certificados c 
            left join certificados_perfil cp on c.id = cp.certificado_id
            left join perfiles p on p.id = cp.perfil_id
            where p.id = ${perfId}`)
        let Certificados = []
        while(stmt.step()) Certificados.push(new Certificado(...stmt.get()))
        stmt.free()
        return Certificados
    },
    findByAptitude(aptitude_id) {
        return certificadosPerfil.filter(([,aptId])  => +aptId === +aptitude_id)
            .map(([certId,]) => this.findOne(certId));
    }
}