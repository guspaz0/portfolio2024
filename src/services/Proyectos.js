import Proyectos from "../data/proyectos.js";
import ProyectosAptitudes from "../data/proyectos_aptitudes.js";
import proyectos_perfil from "../data/proyectos_perfil.js";
import Aptitudes from "./Aptitudes.js";
import {Proyecto} from "../models/Proyecto.js";

export default {
    findAll: function (){
        return Proyectos.map(pr =>
            new Proyecto(
                pr.id,
                pr.nombre,
                pr.descripcion,
                pr.fecha,
                pr.imagen,
                pr.repositorio,
                pr.deploy
            )
        )
    },
    findOne: function(id) {
        const pr = Proyectos.find(proyect => proyect.id === id)
        if (pr) {
            return new Proyecto(
                pr.id,
                pr.nombre,
                pr.descripcion,
                pr.fecha,
                pr.imagen,
                pr.repositorio,
                pr.deploy
            )
        } else throw new Error('No se encontró el proyecto')
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