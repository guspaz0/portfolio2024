import Proyectos from "../data/proyectos.js";
import ProyectosAptitudes from "../data/proyectos_aptitudes.js";
import proyectos_perfil from "../data/proyectos_perfil.js";
import Aptitudes from "./Aptitudes.js";
import {Proyecto} from "../models/Proyecto.js";

export default {
    findAll: function (){
        return Proyectos.map(([id,nombre,descripcion,fecha,imagen,repositorio,deploy]) =>
            new Proyecto(id,nombre,descripcion,fecha,imagen,repositorio,deploy)
        )
    },
    findOne: function(id) {
        const pr = this.findAll().find(proyect => proyect.id === +id)
        if (pr) return pr
        else throw new Error('No se encontró el proyecto')
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