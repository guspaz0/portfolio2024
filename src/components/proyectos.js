import data from '../data/index.js'

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
                <span className="links">
                    <a v-if="pr.repositorio" v-bind:href="pr.repositorio" rel="noreferrer noopener" id="repo">Repositorio</a>
                    <a v-if="pr.deploy" v-bind:href="pr.deploy" rel="noreferrer noopener" id="deploy">Link Deploy</a>
                </span>
            </article>
        </div>
    </section>
    `,
    data(){
        return {
            Titulo: "Proyectos",
            style: 'proyectos',
            Proyectos: data.Proyectos.findAll()
        }
    }
}
