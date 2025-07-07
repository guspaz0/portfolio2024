import vars from "../utils/var.js";
import categorias from '../services/Categorias.js'
import Aptitudes from "../services/Aptitudes.js";
import type {Categoria} from "./Categoria";

export class Aptitud {
    _id: number;
    _nombre: string;
    _path: string;
    _categoria: Categoria[];
    constructor(id: number, nombre: string, path: string, categoria_id: number) {
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