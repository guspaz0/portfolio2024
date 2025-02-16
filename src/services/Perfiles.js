import perfiles from "../data/perfiles.js";
import {Perfil} from "../models/Perfil.js";

export default {
    findAll: function (){
        return perfiles.map(([id,nombre]) => new Perfil(id,nombre))
    },
    findOne: function (id){
        return this.findAll().find(perf => perf.id === +id)
    }
}