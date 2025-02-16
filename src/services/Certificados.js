import certificadosPerfil from "../data/certificados_perfil.js";
import Certificados from "../data/certificados.js";
import {Certificado} from "../models/Certificado.js";

export default {
    findAll: function (){
        return Certificados.map(([id,nombre, escuela_id,path,fecha]) =>
            new Certificado(id,nombre,escuela_id,path,fecha)
        )
    },
    findOne: function(id) {
        const cert = this.findAll().find(cert => cert.id === +id)
        if (cert) return cert
        else throw new Error('No se encontró el certificado')
    },
    findByPerfil(prof_Id) {
        return certificadosPerfil.filter(([,profId])=> +profId === +prof_Id)
            .map(([certId,]) => this.findOne(certId))
    },
    findByAptitude(aptitude_id) {
        return certificadosPerfil.filter(([,aptId])  => +aptId === +aptitude_id)
            .map(([certId,]) => this.findOne(certId));
    }
}