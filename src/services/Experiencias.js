import experiencia from "../data/experiencia.js";
import Experiencia from '../models/Experiencia.js'
import experiencia_perfil from "../data/experiencia_perfil.js";

export default {
    findAll: function (){
        return experiencia.map(([id,nombre,descripcion,empresa,imagen,fecha,fechaFin]) => {
                return new Experiencia(id,nombre,descripcion,empresa,imagen,fecha,fechaFin);
            })
            .sort((a,b) => (b.fecha - a.fecha))
    },
    findOne(id) {
        return this.findAll().find(exp => exp.id === +id)
    },
    findByPerfil(perfId){
        return experiencia_perfil.filter(([,perf_id]) => perf_id === +perfId)
            .map(([exp_id,]) => this.findOne(exp_id))
            .sort((a,b) => (b.fecha - a.fecha))
    }
}