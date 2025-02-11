import vars from "../utils/var.js";
import Experiencia from "../data/experiencia.js";

export default {
    findAll: function (){
        return Experiencia.map((exp) => {
            let meses = ((exp.fechaFin-exp.fecha)/(1000*60*60*24*30))
            let años = meses >= 12?  Math.floor(meses/12) : 0
            return {...exp,
                imagen: exp.imagen? vars.expurl+exp.imagen : '',
                tiempo: {
                    años,
                    meses: Math.floor(meses-años*12)
                }
            }
        }).sort((a,b) => (b.fecha - a.fecha))
    }
}