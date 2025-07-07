export class Categoria {
    _id: number
    _nombre: string;

    constructor(id: number, nombre: string) {
        this._id = id;
        this._nombre = nombre;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._nombre;
    }
}