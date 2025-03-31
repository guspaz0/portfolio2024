import certificadosPerfil from "../data/certificados_perfil.js";
import Certificados from "../data/certificados.js";
import {Certificado} from "../models/Certificado.js";
import { CertificadoNotFound } from "../exceptions/Certificado.js";

export default {
    findAll: function (){
        return Certificados.map(cert => new Certificado(...cert))
    },
    findOne: function(id) {
        const cert = new Certificado(...Certificados.find(([certId]) => certId === +id))
        if (cert) return cert
        else throw new CertificadoNotFound(`El certificado id: ${id} no se encontró`)
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