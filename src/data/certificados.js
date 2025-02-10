import Aptitudes from "./aptitudes.js";
import Escuelas from "./escuelas.js";
import vars from '../utils/var.js';
import certificadosPerfil from './certificados_perfil.js';

export default {
    data: [
        {
            id: 2,
            nombre: 'Full Stack Developer',
            escuela: 2,
            path: 'diploma-DH-full-stack_nykp5m.png',
            fecha: new Date(2024,3,1),
            aptitudes: [1,2,4,5,6,8,10,17,24,25,26,33,31]},
        {
            id: 13,
            nombre: 'Backend con java',
            escuela: 1,
            path: 'diploma-backend-java_henry_nat6ad.png',
            fecha: new Date(2024,11,2),
            aptitudes: [16,27,32,31]
        },
        {
            id: 14,
            nombre: 'Fundamentos de Data Analitycs',
            escuela: 8,
            path: 'diploma_Guayerd_data_analitycs_ijit48.png',
            fecha: new Date(2024,11,2),
            aptitudes: [10,22,23,29,28]
        },
        { id: 1, nombre: 'Full Stack Developer', escuela: 1, path: 'diploma-full-stack-henry_sd7ng6.jpg', fecha: new Date(2023,9,1), aptitudes: [1,2,4,5,6,7,8,9,17,11,24,25,33,31,18]},
        { id: 22, nombre: 'Full Stack Developer Java', escuela: 7, path: 'Diploma_CAC_hf3pvz.png', fecha: new Date(2024,6,1), aptitudes: [3,6,16,10,17,24,25,32]},
        { id: 3, nombre: 'Excel Completo de principiante a avanzado', escuela: 3, path: 'udemy_excel_completo_qltlnl.jpg', fecha: new Date(2024,7,26), aptitudes: [22]},
        { id: 4, nombre: 'Tablas dinámicas, dashboards, macros y mas con Google Sheets', escuela: 3, path: 'udemy_google_sheets_jonjmo.jpg', fecha: new Date(2024,7,27), aptitudes: [23]},
        { id: 5, nombre: 'Curso de Docker: Fundamentos', escuela: 4, path: 'docker-fundamentos_qqk5xi.jpg', fecha: new Date(2024,5,22), aptitudes: [18]},
        { id: 6, nombre: 'Curso avanzado de Serverless framework con AWS', escuela: 4, path: 'serverless-avanzado_mpvszm.jpg', fecha: new Date(2024,7,30), aptitudes: [20,21]},
        { id: 7, nombre: 'Aprende todo sobre Looker Studio 2024 (Data Studio)', escuela: 3, path: 'udemy_looker_studio_bbzzjy.jpg', fecha: new Date(2024,3,15), aptitudes: [29]},
        { id: 8, nombre: 'Excel y Power BI - Análisis y Visualizacion de Datos', escuela: 3, path: 'udemy_powerbi_mu1c2e.jpg', fecha: new Date(2024,9,8), aptitudes: [22,28]},
        { id: 9, nombre: 'Curso completo de bases de datos con MySQL', escuela: 3, path: 'udemy_curso_MySQL_clykpf.jpg', fecha: new Date(2024,9,26), aptitudes: [10]},
        { id: 10, nombre: 'Microsoft Power Bi Desktop', escuela: 3, path: 'UC_Power_Bi_Desktop_ouylap.jpg', fecha: new Date(2024,10,4), aptitudes: [28]},
        { id: 11, nombre: 'Power Query', escuela: 3, path: 'UC-power_query_hfh5gf.jpg', fecha: new Date(2024,10,5), aptitudes: [22,28]},
        { id: 12, nombre: 'Spring Boot: Aprende los Módulos para ser un Experto Senior', escuela: 3, path: 'UC-SpringBoot_izvocy.jpg', fecha: new Date(2025,0,12), aptitudes: [16,27,31,32,18]},
        { id: 13, nombre: 'Microsoft Azure Fundamentals AZ-900', escuela: 3, path: 'UC-Azure-AZ-900_blqfmr.jpg', fecha: new Date(2025,0,30), aptitudes: [34]},
        { id: 14, nombre: 'Introduccion a AWS: Fundamentos del cloud computing', escuela: 4, path: 'platzi-aws-fundamentos_qro6bj.jpg', fecha: new Date(2023,8,17), aptitudes: [21]},
        { id: 15, nombre: 'Introduccion a AWS: Cómputo, Almacenamiento y Bases de Datos', escuela: 4, path: 'platzi-aws-computo-y-almacenamiento_toqoda.jpg', fecha: new Date(2023,8,17), aptitudes: [21]},
        { id: 16, nombre: 'Introduccion a AWS: Redes, Gobernanza y Machine Learning', escuela: 4, path: 'aws-redes_ozgzdx.jpg', fecha: new Date(2023,9,17), aptitudes: [21]},
        { id: 17, nombre: 'Curso de Storage en AWS', escuela: 4, path: 'aws-storage_jvwvhn.jpg', fecha: new Date(2023,10,19), aptitudes: [21]},
        { id: 18, nombre: 'Curso de Bases de datos en AWS', escuela: 4, path: 'aws-bases-de-datos_i9c5df.jpg', fecha: new Date(2024,5,22), aptitudes: [21]},
        { id: 19, nombre: 'Curso práctico de AWS: Roles y Seguridad con IAM', escuela: 4, path: 'aws-iam_ojah9p.jpg', fecha: new Date(2023,8,17), aptitudes: [21]},
        { id: 20, nombre: 'Curso práctico de AWS: Cómputo con EC2', escuela: 4, path: 'aws-ec2_xcajzf.jpg', fecha: new Date(2023,8,17), aptitudes: [21]},
        { id: 21, nombre: 'Curso de AWS Redshift para manejo de big data', escuela: 4, path: 'aws-redshift-big-data_exgmnn.jpg', fecha: new Date(2024,5,23), aptitudes: [21]},
        { id: 23, nombre: 'Intro a Smart Contracts', escuela: 9, path: 'eth-kipu_M1-Intro_a_Smart_Contracts_ycihx2.png', fecha: new Date(2024,9,1), aptitudes: [30]},
        { id: 24, nombre: 'Fundamentos de Solidity', escuela: 9, path: 'eth-kipu_M2-Fundamentos_de_Solidity_kfugwx.png', fecha: new Date(2024,9,1), aptitudes: [30]},
        { id: 25, nombre: 'Estándares, Librerías y Patrones', escuela: 9, path: 'eth-kipu_M3-Est%C3%A1ndares_Librer%C3%ADas_y_Patrones_iom441.png', fecha: new Date(2024,9,1), aptitudes: [30]}
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
    },
    findByProfile(prof_Id) {
        return this.findAll()
            .filter(cert => certificadosPerfil.data
                .some(([certId,profId]) => profId === prof_Id && certId === cert.id))
    }
}
