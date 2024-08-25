
export default {
    template: `
    <link href="./src/css/proyectos.css" rel="stylesheet"/>
    <section>
        <h2>{{Titulo}}</h2>
        <div v-bind:className="style">
            <article v-for="pr in Proyectos">
                <h2>{{pr.nombre}}</h2>
                <p>{{pr.descripcion}}</p>
                <div className="proyectos">
                    <span v-for="tec in pr.tecnologias" className="skills">
                        <small>{{tec.nombre}}</small>
                        <img  v-bind:src="cloudurl+tec.path" v-bind:alt="tec.nombre" loading="lazy"/>
                    </span>
                </div>
            </article>
        </div>
    </section>
    `,
    data(){
        return {
            Titulo: "Proyectos",
            style: 'proyectos',
            cloudurl: 'https://res.cloudinary.com/dbowsjk6p/image/upload/v1724456108/aptitudes/',
            Proyectos: [
                {
                    nombre: 'API fichadas', 
                    descripcion: 'Backend API Rest para obtener informacion de fichadas y setear parametros en relojes de asistencia biometricos Zkteco, de forma remota y centralizada. Tambien brinda informacion resumida de horas trabajadas para automatizar procesos internos',
                    tecnologias: [
                        {nombre: 'JWT', path: `jwt_logo_lxcuhq.png`},
                        {nombre: 'Python', path: `Python_logo_hkb9ok.png`},
                        {nombre: 'Psycopg', path: 'psycopg_logo_buszr9.png'},
                        {nombre: 'Fastapi', path: `fastapi_logo_s5m6vu.png`},
                    ]
                },
                {
                    nombre: 'La Tienda de Maria', 
                    descripcion: 'Proyecto tipo E-commerce sobre articulos religiosos / artesanias y dashboard con KPIs. CRUD completo, filtrado y busqueda de articulos. carrito de compras y favoritos. CRUD de Usuarios. Servicio smtp para enviar correo.',
                    tecnologias: [
                        {nombre: 'JWT', path: `jwt_logo_lxcuhq.png`},
                        {nombre: 'Node', path: `node_logo_dh5is6.png`},
                        {nombre: 'Express', path: 'express_logo_dn7khk.png'},
                        {nombre: 'Javascript', path: `JS_logo_eiqeh1.png`},
                        {nombre: 'Sequelize', path: `sequelize_logo_npeuf3.png`},
                        {nombre: 'Mysql', path: `mysql_logo_z9gzvc.png`},
                        {nombre: 'React', path: `react_logo_vzqkhb.png`},
                        {nombre: 'Vite', path: `vite_logo_r8rm42.png`},
                    ]
                }
            ]
        }
    }
}
