import data from '../data/index.js'
import vars from '../utils/var.js'

export default {
    template: `
    <section>
        <h2>{{Titulo}}</h2>
        <div v-bind:className="style">
            <article v-for="pr in Proyectos">
                <h2>{{pr.nombre}}</h2>
                <p>{{pr.descripcion}}</p>
                <b>Tecnologias:</b>
                <div className="proyectos">
                    <span v-for="tec in pr.tecnologias" className="skills">
                        <small>{{tec.nombre}}</small>
                    </span>
                </div>
                <span>
                    <a v-bind:href="pr.repositorio" rel="noreferrer noopener">Repositorio</a>
                    <a v-bind:href="pr.deploy" rel="noreferrer noopener">Link Deploy</a>
                </span>
            </article>
        </div>
    </section>
    `,
    data(){
        return {
            cloudurl: vars.cloudurl,
            Titulo: "Proyectos",
            style: 'proyectos',
            Proyectos: data.Proyectos.findAll()
        }
    }
}
