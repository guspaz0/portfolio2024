export class Categoria {
    constructor(id, nombre) {
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