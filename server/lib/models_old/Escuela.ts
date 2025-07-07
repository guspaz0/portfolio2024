import vars from '../utils/var.js';

export class Escuela {
    _id: number;
    _nombre: string;
    _path: string;

    constructor(id: number, nombre: string, path: string) {
        this._id = id;
        this._nombre = nombre;
        this._path = vars.escuelaurl+path;
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
}