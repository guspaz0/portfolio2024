import aptitudesPerfil from "../data/aptitudes_perfil.js";
import CertificadosAptitudes from "../data/certificados_aptitudes.js";
import Aptitudes from "../data/aptitudes.js";
import {Aptitud} from "../models/Aptitud.js";

export default {
    findAll() {
        return Aptitudes.map(([id,nombre,path,categoria_id]) =>
            new Aptitud(id, nombre, path, categoria_id)
        )
    },
    findOne: function (id) {
        const tec = this.findAll().find(apt => apt.id === id)
        if (tec) return tec
        else throw new Error("No se encuentra la Tecnologia");
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