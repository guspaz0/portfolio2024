import Escuelas from "../data/escuelas.js";
import {Escuela} from "../models/Escuela.js";

export default {
    findAll: function (){
        return Escuelas.map((esc) =>
            new Escuela(esc.id,esc.nombre,esc.path))
    },
    findOne: function(id) {
        const escuela = Escuelas.find((esc) => esc.id === +id)
        if (escuela) {
            return new Escuela(escuela.id, escuela.nombre, escuela.path)
        } else throw new Error('No se encontró la escuela')
    },
    findByPerfil: function(id){

    }
}