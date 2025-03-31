import Escuelas from "../data/escuelas.js";
import { EscuelaNotFound } from "../exceptions/Escuela.js";
import {Escuela} from "../models/Escuela.js";

export default {
    findAll: function (){
        return Escuelas.map(escuela => new Escuela(...escuela))
    },
    findOne: function(id) {
        const escuela = new Escuela(...Escuelas.find(([escId]) => escId === +id))
        if (escuela) return escuela
        else throw new EscuelaNotFound(`La escuela id: ${id} no se encontró`)
    },
    findByPerfil: function(id){

    }
}