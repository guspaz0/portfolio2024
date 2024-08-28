import vars from '../utils/var.js'

export default {
    data: [
        {id: 1,nombre: 'React', path: `react_logo_vzqkhb.png`},
        {id: 2,nombre: 'Vite', path: `vite_logo_r8rm42.png`},
        {id: 3,nombre: 'Vue 3', path: `vue_logo_fu6luo.png`},
        {id: 4,nombre: 'Node', path: `node_logo_dh5is6.png`},
        {id: 5,nombre: 'express', path: `express_logo_dn7khk.png`},
        {id: 6,nombre: 'Javascript', path: `JS_logo_eiqeh1.png`},
        {id: 7,nombre: 'Redux', path: `redux_logo_h3baai.png`},
        {id: 8,nombre: 'Sequelize', path: `sequelize_logo_npeuf3.png`},
        {id: 9,nombre: 'Postgres', path: `postgres_logo_benmgj.png`},
        {id: 10,nombre: 'Mysql', path: `mysql_logo_z9gzvc.png`},
        {id: 11,nombre: 'JWT', path: `jwt_logo_lxcuhq.png`},
        {id: 12,nombre: 'Python', path: `Python_logo_g1niuu.svg`},
        {id: 13,nombre: 'Psycopg', path: 'psycopg_logo_buszr9.png'},
        {id: 14,nombre: 'Fastapi', path: `fastapi_logo_s5m6vu.png`},
        {id: 15,nombre: 'Tomcat', path: `tomcat_logo_cob4ax.png`},
        {id: 16,nombre: 'Java', path: `java_logo_dxiy5o.png`},
        {id: 17,nombre: 'Github', path: `github_logo_xodefl.png`},
        {id: 18,nombre: 'Docker', path: `docker_logo_w8pb4p.png`},
        {id: 19, nombre: 'Next', path: ''}
    ],
    findAll(){
        return this.data.map(x => {
            return {...x, path: vars.cloudurl+x.path}
        })
    },
    findOne: function (id) {
        const tecnologia = this.data.find(tec => tec.id == id)
        if (tecnologia) return {
            ...tecnologia, 
            path: vars.cloudurl+tecnologia.path
        }
        else throw new Error("No se encuentra la Tecnologia");
        
    }
}