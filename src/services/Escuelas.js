import Escuelas from "../data/escuelas.js";
import {Escuela} from "../models/Escuela.js";

export default {
    findAll: function (){
        return Escuelas.map(([id,nombre,path]) => new Escuela(id,nombre,path))
    },
    findOne: function(id) {
        const escuela = this.findAll().find((esc) => esc.id === +id)
        if (escuela) return escuela
        else throw new Error('No se encontró la escuela')
    },
    findByPerfil: function(id){

    }
}