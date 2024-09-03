import Tecnologias from "./tecnologias.js";
import Escuelas from "./escuelas.js";
import vars from '../utils/var.js'

export default {
    data: [
        { id: 1, nombre: 'Full Stack Developer', escuela: 1, path: '', fecha: new Date(), tecnologias: [1,2,4,5,6,7,8,9,17]},
        { id: 2, nombre: 'Full Stack Developer', escuela: 2, path: '', fecha: new Date(), tecnologias: [1,2,4,5,6,8,10]},
        { id: 2, nombre: 'Full Stack Developer Java', escuela: 7, path: '', fecha: new Date(), tecnologias: [3,16,10,15]},
        { id: 3, nombre: 'Excel Completo de principiante a avanzado', escuela: 3, path: '', fecha: new Date(), tecnologias: [22]},
        { id: 4, nombre: 'Google Sheets y mas', escuela: 3, path: '', fecha: new Date(), tecnologias: [23]},
        { id: 5, nombre: 'Docker Fundamentos', escuela: 4, path: '', fecha: new Date(), tecnologias: [18]},
        { id: 6, nombre: 'Serverless framework avanzado con AWS', escuela: 4, path: '', fecha: new Date(), tecnologias: [20,21]},
        { id: 6, nombre: 'Cloud computing y machine learning en la nube con AWS', escuela: 4, path: '', fecha: new Date(), tecnologias: [21]}
    ],
    findAll: function (){
        return this.data.map(cert => {
            return {...cert,
                escuela: Escuelas.findOne(cert.escuela),
                tecnologias: cert.tecnologias.map(t => Tecnologias.findOne(t))
            }
        })
    },
    findOne: function(id) {
        const certificado = this.data.find(cert => cert.id == id)
        if (certificado) {
            return {...certificado, 
                escuela: Escuelas.findOne(certificado.escuela),
                tecnologias: cert.tecnologias.map(t => Tecnologias.findOne(t))
            }
        } else throw new Error('No se encontró el certificado')
    }
}