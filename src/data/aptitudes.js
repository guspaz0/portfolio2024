import vars from '../utils/var.js'
import categorias from './categorias.js'
import Proyectos from './proyectos.js'

export default {
    data: [
        {id: 1,nombre: 'React', path: `react_logo_vzqkhb.png`, categoria: 2},
        {id: 2,nombre: 'Vite', path: `vite_logo_r8rm42.png`, categoria: 2},
        {id: 3,nombre: 'Vue 3', path: `vue_logo_fu6luo.png`, categoria: 2},
        {id: 4,nombre: 'Node', path: `node_logo_dh5is6.png`, categoria: 2},
        {id: 5,nombre: 'express', path: `express_logo_dn7khk.png`, categoria: 2},
        {id: 6,nombre: 'Javascript', path: `JS_logo_eiqeh1.png`, categoria: 2},
        {id: 7,nombre: 'Redux', path: `redux_logo_h3baai.png`, categoria: 2},
        {id: 8,nombre: 'Sequelize', path: `sequelize_logo_npeuf3.png`, categoria: 2},
        {id: 9,nombre: 'PostgreSQL', path: `postgres_logo_benmgj.png`, categoria: 2},
        {id: 10,nombre: 'MySQL', path: `mysql_logo_z9gzvc.png`, categoria: 2},
        {id: 11,nombre: 'JWT', path: `jwt_logo_lxcuhq.png`, categoria: 2},
        {id: 12,nombre: 'Python', path: `Python_logo_g1niuu.svg`, categoria: 2},
        {id: 13,nombre: 'Psycopg', path: 'psycopg_logo_buszr9.png', categoria: 2},
        {id: 14,nombre: 'Fastapi', path: `fastapi_logo_s5m6vu.png`, categoria: 2},
        {id: 15,nombre: 'Tomcat', path: `tomcat_logo_cob4ax.png`, categoria: 2},
        {id: 16,nombre: 'Java', path: `java_logo_dxiy5o.png`, categoria: 2},
        {id: 17,nombre: 'Github', path: `github_logo_xodefl.png`, categoria: 2},
        {id: 18,nombre: 'Docker', path: `docker_logo_w8pb4p.png`, categoria: 2},
        {id: 19, nombre: 'Next', path: '', categoria: 2},
        {id: 20, nombre: 'Serverless', path: 'serverless_logo_cmfxpj.png', categoria: 2},
        {id: 21, nombre: 'AWS', path: 'aws_logo_vvu4gp.png', categoria: 2},
        {id: 22, nombre: 'Microsoft Excel', path: 'excel_logo_zp7tlj.png', categoria: 2},
        {id: 23, nombre: 'Google Sheets', path: 'google_sheets_logol_t8vgn6.png', categoria: 2},
        {id: 24, nombre: 'HTML', path: 'HTML5_logo_v0liwi.png', categoria: 2},
        {id: 25, nombre: 'CSS', path: 'CSS3_logo_udoavo.svg', categoria: 2}
    ],
    findAll(){
        return this.data.map(x => {
            return {...x, 
                path: vars.cloudurl+x.path, 
                categoria: categorias.findOne(x.categoria)
            }
        })
    },
    findOne: function (id) {
        const tecnologia = this.data.find(tec => tec.id == id)
        if (tecnologia) return {
            ...tecnologia, 
            path: vars.cloudurl+tecnologia.path,
            categoria: categorias.findOne(tecnologia.categoria)
        }
        else throw new Error("No se encuentra la Tecnologia");
        
    },
    countProyects: function (){
        let count = []
        for (let i = 0; i < this.data; i++){
            
        }
    }
}