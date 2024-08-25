export default {
    template: `<link href="./src/css/aptitudes.css" rel="stylesheet"/>
        <section>
            <h2>Habilidades tecnicas:</h2>
            <div className="aptitudes">
                <span v-for="skill in aptitudes" className="imgtext">
                    <small>{{skill.nombre}}</small>
                    <img v-bind:src="cloudurl+skill.path" v-bind:alt="skill.nombre" loading="lazy"/>
                </span>
            </div>
        </section>`,
    data: ()=> {
        return {
            cloudurl: 'https://res.cloudinary.com/dbowsjk6p/image/upload/v1724456108/aptitudes/',
            aptitudes: [
                {nombre: 'React', path: `react_logo_vzqkhb.png`},
                {nombre: 'Vite', path: `vite_logo_r8rm42.png`},
                {nombre: 'Vue 3', path: `vue_logo_fu6luo.png`},
                {nombre: 'Node', path: `node_logo_dh5is6.png`},
                {nombre: 'express', path: `express_logo_dn7khk.png`},
                {nombre: 'Javascript', path: `JS_logo_eiqeh1.png`},
                {nombre: 'Redux', path: `redux_logo_h3baai.png`},
                {nombre: 'Sequelize', path: `sequelize_logo_npeuf3.png`},
                {nombre: 'Postgres', path: `postgres_logo_benmgj.png`},
                {nombre: 'Mysql', path: `mysql_logo_z9gzvc.png`},
                {nombre: 'JWT', path: `jwt_logo_lxcuhq.png`},
                {nombre: 'Python', path: `Python_logo_g1niuu.svg`},
                {nombre: 'Psycopg', path: 'psycopg_logo_buszr9.png'},
                {nombre: 'Fastapi', path: `fastapi_logo_s5m6vu.png`},
                {nombre: 'Tomcat', path: `tomcat_logo_cob4ax.png`},
                {nombre: 'Java', path: `java_logo_dxiy5o.png`},
                {nombre: 'Github', path: `github_logo_xodefl.png`},
                {nombre: 'Docker', path: `docker_logo_w8pb4p.png`},
            ]
        }
    }
}