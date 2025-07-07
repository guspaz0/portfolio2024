import Aptitudes from "../services/Aptitudes.js";
import Certificados from "../services/Certificados.js";
import Proyectos from "../services/Proyectos.js";
import Escuelas from "../services/Escuelas.js";
import Experiencias from "../services/Experiencias.js";
import type Experiencia from "./Experiencia"


export class Perfil {
    _id: number;
    _nombre: string;
    _proyectos: Proyectos;
    _certificados: Certificados;
    _aptitudes: Aptitudes;
    _experiencias: Experiencia[];

    constructor(id: number, nombre: string) {
        this._id = id;
        this._nombre = nombre;
        this._proyectos = Proyectos.findByPerfil(id);
        this._certificados = Certificados.findByPerfil(id);
        this._aptitudes = Aptitudes.findByPerfil(id);
        this._experiencias = Experiencias.findByPerfil(id);
        //this._escuelas = Escuelas.findByPerfil(id);
    }

    // get escuelas() {
    //     return this._escuelas;
    // }
    get experiencias(){
        return this._experiencias;
    }

    get proyectos() {
        return this._proyectos;
    }

    get certificados() {
        return this._certificados;
    }

    get aptitudes() {
        return this._aptitudes;
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }
}