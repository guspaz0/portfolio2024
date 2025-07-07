import vars from "../utils/var.js"
import Proyectos from "../services/Proyectos.js";
import Aptitudes from "../services/Aptitudes.js";

export class Proyecto {
    _id: number;
    _nombre: string;
    _descripcion: string;
    _fecha: Date;
    _imagen: string;
    _repositorio: string;
    _deploy: string;

    constructor (
        id: number,
        nombre: string,
        descripcion: string,
        fecha: Date,
        imagen: string,
        repositorio: string,
        deploy: string
    ) {
        this._id = id;
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._fecha = fecha;
        this._imagen =  imagen? vars.proyectourl+imagen : '';
        this._repositorio = repositorio? vars.github+repositorio : '';
        this._deploy = deploy;
    }

    get aptitudes() {
        return Aptitudes.findByProject(this._id);
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get descripcion() {
        return this._descripcion;
    }

    get fecha() {
        return this._fecha;
    }

    get imagen() {
        return this._imagen;
    }

    get repositorio() {
        return this._repositorio;
    }

    get deploy() {
        return this._deploy;
    }
}