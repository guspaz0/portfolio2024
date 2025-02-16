import vars from '../utils/var.js'
import Aptitudes from "../services/Aptitudes.js";
import Escuelas from "../services/Escuelas.js";

export class Certificado {

    constructor(id, nombre, escuela, path, fecha) {
        this._id = id;
        this._nombre = nombre;
        this._escuela = Escuelas.findOne(escuela);
        this._path = vars.certurl+path;
        this._fecha = new Date(fecha);
        this._aptitudes = Aptitudes.findByCertificate(id);
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

    get path() {
        return this._path;
    }

    get escuela() {
        return this._escuela;
    }

    get fecha() {
        return this._fecha;
    }
}