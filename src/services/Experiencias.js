import Experiencias from "../data/experiencia.js";
import Experiencia from '../models/Experiencia.js'
import experiencia_perfil from "../data/experiencia_perfil.js";
import { ExperienciaNotFound } from "../exceptions/Experiencia.js";

export default {
    findAll: function (){
        return Experiencias.map(experiencia => new Experiencia(...experiencia))
            .sort((a,b) => (b.fecha - a.fecha))
    },
    findOne(id) {
        const Exp = new Experiencia(...Experiencias.find(([expId]) => expId === +id))
        if (Exp) return Exp
        else throw new ExperienciaNotFound(`La expenriencia id: ${id} no se encontró`)
    },
    findByPerfil(perfId){
        return experiencia_perfil.filter(([,perf_id]) => perf_id === +perfId)
            .map(([exp_id,]) => this.findOne(exp_id))
            .sort((a,b) => (b.fecha - a.fecha))
    }
}