import vars from '../utils/var.js';

export default class Experiencia{
    _id: number;
    _nombre: string;
    _descripcion: string;
    _empresa: string;
    _imagen: string;
    _fecha: Date;
    _fechaFin: Date;
    _duracion: Duracion;

    constructor(id: number,nombre: string,descripcion: string,empresa: string,imagen: string,fecha: Date, fechaFin: Date){
        this._id = id;
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._empresa = empresa;
        this._imagen = imagen? vars.expurl+imagen : '';
        this._fecha = new Date(fecha);
        this._fechaFin = new Date(fechaFin? fechaFin : Date.now());
        this._duracion = new Duracion(fecha,fechaFin);
    }

    get duracion() {
        return this._duracion;
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

    get empresa() {
        return this._empresa;
    }

    get imagen() {
        return this._imagen;
    }

    get fecha() {
        return this._fecha;
    }

    get fechaFin() {
        return this._fechaFin;
    }
}

class Duracion {
    _meses: number;
    _años: number;

    constructor(fecha: Date, fechaFin: Date) {
        this._meses = ((new Date(fechaFin? fechaFin : Date.now())-new Date(fecha))/(1000*60*60*24*30))
        this._años = 0;
    }
    get años(){
        return this._meses >= 12
        ? Math.floor(this._meses/12)
        : 0;
    }
    get meses(){
        this._años = this._meses >= 12
            ? Math.floor(this._meses/12)
            : 0;
        return Math.floor(this._meses-this._años*12)
    }
}