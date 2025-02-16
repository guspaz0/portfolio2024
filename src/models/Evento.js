import vars from '../utils/var.js'

export default class Evento{
    constructor(id, titulo, descripcion, fecha, imagen){
        this._id = id;
        this._titulo = titulo;
        this._descripcion = descripcion;
        this._fecha = fecha? new Date(fecha) : '';
        this._imagen = vars.certurl+imagen;
    }

    get id() {
        return this._id;
    }

    get titulo() {
        return this._titulo;
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
}