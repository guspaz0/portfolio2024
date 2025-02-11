import Aptitudes from "../services/Aptitudes.js";
import Certificados from "../services/Certificados.js";
import Proyectos from "../services/Proyectos.js";
import Escuelas from "../services/Escuelas.js";

export class Perfil {
    constructor(id, nombre) {
        this._id = id;
        this._nombre = nombre;
        this._proyectos = Proyectos.findByPerfil(id);
        this._certificados = Certificados.findByPerfil(id);
        this._aptitudes = Aptitudes.findByPerfil(id);
        //this._escuelas = Escuelas.findByPerfil(id);
    }

    // get escuelas() {
    //     return this._escuelas;
    // }

    get proyectos() {
        return this._proyectos;
    }

    get certificados() {
        return this._certificados;
    }

    get aptitudes() {
        return this._aptitudes;
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }
}