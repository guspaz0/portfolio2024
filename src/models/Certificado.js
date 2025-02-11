import vars from '../utils/var.js'
import Aptitudes from "../services/Aptitudes.js";
import Escuelas from "../services/Escuelas.js";

export class Certificado {

    constructor(id, nombre, path, fecha, escuela) {
        this._path = vars.certurl+path;
        this._id = id;
        this._nombre = nombre;
        this._path = vars.escuelaurl+path;
        this._fecha = fecha;
        this._escuela = Escuelas.findOne(escuela);
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