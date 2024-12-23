import Aptitudes from "./aptitudes.js";
import Escuelas from "./escuelas.js";
import vars from '../utils/var.js';

export default {
    data: [
        { id: 1, nombre: 'Full Stack Developer', escuela: 1, path: 'diploma-full-stack-henry_sd7ng6.jpg', fecha: new Date(2023,9,1), aptitudes: [1,2,4,5,6,7,8,9,17,11,24,25]},
        { id: 2, nombre: 'Full Stack Developer', escuela: 2, path: 'diploma-DH-full-stack_nykp5m.png', fecha: new Date(2024,3,1), aptitudes: [1,2,4,5,6,8,10,17,24,25,26]},
        { id: 2, nombre: 'Full Stack Developer Java', escuela: 7, path: 'Diploma_CAC_hf3pvz.png', fecha: new Date(2024,6,1), aptitudes: [3,6,16,10,15,17,24,25]},
        { id: 3, nombre: 'Excel Completo de principiante a avanzado', escuela: 3, path: 'udemy_excel_completo_qltlnl.jpg', fecha: new Date(2024,7,26), aptitudes: [22]},
        { id: 4, nombre: 'Tablas dinámicas, dashboards, macros y mas con Google Sheets', escuela: 3, path: 'udemy_google_sheets_jonjmo.jpg', fecha: new Date(2024,7,27), aptitudes: [23]},
        { id: 5, nombre: 'Docker Fundamentos', escuela: 4, path: '', fecha: new Date(2024,3,15), aptitudes: [18]},
        { id: 6, nombre: 'Serverless framework avanzado con AWS', escuela: 4, path: '', fecha: new Date(2024,7,30), aptitudes: [20,21]},
        { id: 7, nombre: 'Cloud computing y machine learning en la nube con AWS', escuela: 4, path: '', fecha: new Date(2024,3,15), aptitudes: [21]},
        { id: 8, nombre: 'Aprende todo sobre Looker Studio 2024 (Data Studio)', escuela: 3, path: 'udemy_looker_studio_bbzzjy.jpg', fecha: new Date(2024,3,15), aptitudes: [27]},
        { id: 9, nombre: 'Excel y Power BI - Análisis y Visualizacion de Datos', escuela: 3, path: 'udemy_powerbi_mu1c2e.jpg', fecha: new Date(2024,9,8), aptitudes: [28]},
        { id: 10, nombre: 'Curso completo de bases de datos con MySQL', escuela: 3, path: 'udemy_curso_MySQL_clykpf.jpg', fecha: new Date(2024,9,26), aptitudes: [10]},
        { id: 11, nombre: 'Microsoft Power Bi Desktop', escuela: 3, path: 'UC_Power_Bi_Desktop_ouylap.jpg', fecha: new Date(2024,10,4), aptitudes: [10]},
        { id: 12, nombre: 'Power Query', escuela: 3, path: 'UC-power_query_hfh5gf.jpg', fecha: new Date(2024,10,5), aptitudes: [10]},
        { id: 13, nombre: 'Backend con java', escuela: 1, path: 'diploma-backend-java_henry_nat6ad.png', fecha: new Date(2024,11,2), aptitudes: [3,6,16,10,15,17,24,25,27]}
    ],
    findAll: function (){
        return this.data.map(cert => {
            return {...cert,
                escuela: Escuelas.findOne(cert.escuela),
                aptitudes: cert.aptitudes.map(t => Aptitudes.findOne(t)),
                path: cert.path? vars.certurl+cert.path : cert.path
            }
        })
    },
    findOne: function(id) {
        const cert = this.data.find(cert => cert.id == id)
        if (cert) {
            return {...cert, 
                escuela: Escuelas.findOne(cert.escuela),
                aptitudes: cert.aptitudes.map(t => Aptitudes.findOne(t)),
                path: cert.path? vars.certurl+cert.path : cert.path
            }
        } else throw new Error('No se encontró el certificado')
    }
}