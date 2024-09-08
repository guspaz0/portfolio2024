import proyectos from './proyectos.js'

class Proyecto {
    constructor(id, nombre, descripcion, aptitudes, imagen, repositorio, deploy){
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.aptitudes = aptitudes
        this.imagen = imagen
        this.repositorio = repositorio
        this.deploy = deploy
    }
    getAptitudes(){
        return this.aptitudes
    }

}