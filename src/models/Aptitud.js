import vars from "../utils/var.js";
import proyectos_aptitudes from "../data/proyectos_aptitudes.js";
import certificados_aptitudes from "../data/certificados_aptitudes.js";
import categorias from '../services/Categorias.js'

export class Aptitud {
    constructor(id, nombre, path, categoria_id) {
        this._id = id;
        this._nombre = nombre;
        this._path = vars.cloudurl+path;
        this._categoria = categorias.findOne(categoria_id);
        this._countProyects = proyectos_aptitudes.filter(([,aptId]) => aptId === id).length;
        this._countCertificados = certificados_aptitudes.filter(([,aptId]) => aptId === id).length;
    }

    get countProyects() {
        return this._countProyects;
    }

    get countCertificados() {
        return this._countCertificados;
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

    get categoria() {
        return this._categoria;
    }
}