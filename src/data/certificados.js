import Aptitudes from "./aptitudes.js";
import Escuelas from "./escuelas.js";
import vars from '../utils/var.js'

export default {
    data: [
        { id: 1, nombre: 'Full Stack Developer', escuela: 1, path: '', fecha: new Date(2023,9,1), aptitudes: [1,2,4,5,6,7,8,9,17,11,24,25]},
        { id: 2, nombre: 'Full Stack Developer', escuela: 2, path: '', fecha: new Date(2024,3,1), aptitudes: [1,2,4,5,6,8,10,17,24,25,26]},
        { id: 2, nombre: 'Full Stack Developer Java', escuela: 7, path: '', fecha: new Date(2024,6,1), aptitudes: [3,6,16,10,15,17,24,25]},
        { id: 3, nombre: 'Excel Completo de principiante a avanzado', escuela: 3, path: '', fecha: new Date(2024,7,1), aptitudes: [22]},
        { id: 4, nombre: 'Google Sheets y mas', escuela: 3, path: '', fecha: new Date(2024,7,15), aptitudes: [23]},
        { id: 5, nombre: 'Docker Fundamentos', escuela: 4, path: '', fecha: new Date(2024,3,15), aptitudes: [18]},
        { id: 6, nombre: 'Serverless framework avanzado con AWS', escuela: 4, path: '', fecha: new Date(2024,7,30), aptitudes: [20,21]},
        { id: 6, nombre: 'Cloud computing y machine learning en la nube con AWS', escuela: 4, path: '', fecha: new Date(2024,3,15), aptitudes: [21]}
    ],
    findAll: function (){
        return this.data.map(cert => {
            return {...cert,
                escuela: Escuelas.findOne(cert.escuela),
                aptitudes: cert.aptitudes.map(t => Aptitudes.findOne(t))
            }
        })
    },
    findOne: function(id) {
        const certificado = this.data.find(cert => cert.id == id)
        if (certificado) {
            return {...certificado, 
                escuela: Escuelas.findOne(certificado.escuela),
                aptitudes: cert.aptitudes.map(t => Aptitudes.findOne(t))
            }
        } else throw new Error('No se encontró el certificado')
    }
}