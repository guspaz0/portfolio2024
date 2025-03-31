import perfiles from "../data/perfiles.js";
import { PerfilNotFound } from "../exceptions/Perfil.js";
import {Perfil} from "../models/Perfil.js";

export default {
    findAll: function (){
        return perfiles.map(perfil => new Perfil(...perfil))
    },
    findOne: function (id){
        const perfil = new Perfil(...perfiles.find(([perfId]) => perfId === +id))
        if (perfil) return perfil
        else throw new PerfilNotFound(`El Perfil id: ${id} no se encontró`)
    }
}