import aptitudesPerfil from "../data/aptitudes_perfil.js";
import CertificadosAptitudes from "../data/certificados_aptitudes.js";
import Aptitudes from "../data/aptitudes.js";
import {Aptitud} from "../models/Aptitud.js";
import { AptitudNotFound } from "../exceptions/Aptitud.js";

export default {
    findAll() {
        return Aptitudes.map(aptitud => new Aptitud(...aptitud))
    },
    findOne: function (id) {
        const tec = new Aptitud(...Aptitudes.find(([aptId]) => aptId === id))
        if (tec) return tec
        else throw new AptitudNotFound(`La Aptitud Id: ${id} no se encuentra`);
    },
    findByPerfil(profileId) {
        return aptitudesPerfil.filter(([aptId,profId]) => +profileId === +profId)
            .map(([aptId,]) => this.findOne(aptId))
    },
    findByCertificate(cert_id) {
        return CertificadosAptitudes.filter(([certId,]) => +certId === +cert_id)
            .map(([, aptId]) => this.findOne(aptId));
    }
}