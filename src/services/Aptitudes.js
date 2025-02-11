import aptitudesPerfil from "../data/aptitudes_perfil.js";
import CertificadosAptitudes from "../data/certificados_aptitudes.js";
import Aptitudes from "../data/aptitudes.js";
import {Aptitud} from "../models/Aptitud.js";

export default {
    findAll() {
        return Aptitudes.map(apt =>
            new Aptitud(
                apt.id,
                apt.nombre,
                apt.path,
                apt.categoria
            )
        )
    },
    findOne: function (id) {
        const tec = Aptitudes.find(tec => tec.id === id)
        if (tec) {
            return new Aptitud(
                tec.id,
                tec.nombre,
                tec.path,
                tec.categoria
            )
        }
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