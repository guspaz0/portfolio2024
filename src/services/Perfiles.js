import perfiles from "../data/perfiles.js";
import {Perfil} from "../models/Perfil.js";

export default {
    findAll: function (){
        return perfiles.map(perf => new Perfil(perf.id,perf.nombre))
    },
    findOne: function (id){
        return perfiles.find(perf => perf.id === id)
    }
}