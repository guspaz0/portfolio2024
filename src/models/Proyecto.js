import vars from "../utils/var.js"
import proyectos_aptitudes from "../data/proyectos_aptitudes.js";
import Aptitudes from "../services/Aptitudes.js"

export class Proyecto {
    constructor(
        id,
        nombre,
        descripcion,
        fecha,
        imagen,
        repositorio,
        deploy
    ) {
        this._id = id;
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._fecha = fecha;
        this._imagen =  vars.proyectourl+imagen;
        this._repositorio = repositorio;
        this._deploy = deploy;
        this._aptitudes = proyectos_aptitudes.filter(([projId,]) => projId === id)
            .map(([,aptId]) => Aptitudes.findOne(aptId));
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