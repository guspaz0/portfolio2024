import vars from '../utils/var.js'
import Aptitudes from "../services/Aptitudes.js";
import Escuelas from "../services/Escuelas.js";
import type {Escuela} from "~/models/Escuela";

export class Certificado {
    _id: number;
    _nombre: string;
    _escuela: Escuela;
    _path: string;
    _fecha: Date;
    _aptitudes: Aptitudes[];
    constructor(id: number, nombre: string, escuela: string, path: string, fecha: Date | string) {
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