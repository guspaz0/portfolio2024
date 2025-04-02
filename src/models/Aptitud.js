import vars from "../utils/var.js";
import categorias from '../services/Categorias.js'
import Aptitudes from "../services/Aptitudes.js";

export class Aptitud {
    constructor(id, nombre, path, categoria_id) {
        this._id = id;
        this._nombre = nombre;
        this._path = vars.cloudurl+path;
        this._categoria = categorias.findOne(categoria_id);
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
    get countProyects() {
        return Aptitudes.countProject(this._id)
    }
    get countCertificados(){
        return Aptitudes.countCertificados(this._id)
    }
}