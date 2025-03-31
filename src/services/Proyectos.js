import Proyectos from "../data/proyectos.js";
import ProyectosAptitudes from "../data/proyectos_aptitudes.js";
import proyectos_perfil from "../data/proyectos_perfil.js";
import Aptitudes from "./Aptitudes.js";
import {Proyecto} from "../models/Proyecto.js";
import { ProyectoNotFound } from "../exceptions/Proyecto.js";

export default {
    findAll: function (){
        return Proyectos.map(proyecto => new Proyecto(...proyecto))
    },
    findOne: function(id) {
        const proyecto = new Proyecto(...Proyectos.find(([proyectId]) => proyectId === +id))
        if (proyecto) return proyecto
        else throw new ProyectoNotFound(`El proyecto id: ${id} no se encontró`)
    },
    findProyectosAptitudes: function (project_id){
        return ProyectosAptitudes.filter(([proId, aptId]) => proId === project_id)
            .map(([, aptId]) => Aptitudes.findOne(aptId))
    },
    findByPerfil: function (perfil_id){
        return proyectos_perfil.filter(([,perfId]) => +perfId === +perfil_id)
            .map(([projId,]) => this.findOne(projId))
    }
}