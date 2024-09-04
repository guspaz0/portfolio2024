import data from '../data/index.js'

export default {
    template: `
    <section v-bind:id="el">
        <h2>{{Titulo}}</h2>
        <form>
            <fieldset>
                <legend>Filtros</legend>
                <label for="filterTec">Tecnologia:</label>
                <select id="filterTec" v-model="filterTecnologia">
                    <option v-for="tec in Tecnologias" v-bind:value="tec.id">
                    {{tec.nombre}}
                    </option>
                </select>
            </fieldset>
            <span className="card" @click.prevent="reset">Reset</span>
        </form>
        <div v-bind:className="el">
            <article v-for="pr in Proyectos">
                <h2>{{pr.nombre}}</h2>
                <p>{{pr.descripcion}}</p>
                <b>Tecnologias:</b>
                <div className="proyectos">
                    <span v-for="tec in pr.tecnologias" className="skills">
                        <small>{{tec.nombre}}</small>
                    </span>
                </div>
                <span className="links" @contextmenu.prevent="">
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
            el: 'proyectos',
            Proyectos: data.Proyectos.findAll(),
            Tecnologias: data.Tecnologias.findAll(),
            filterTecnologia: ''
        }
    },
    methods: {
        reset(){
            this.filterTecnologia = ''
            this.Proyectos = data.Proyectos.findAll()
        }
    },
    watch: {
        filterTecnologia(val){
            if (val != ''){
                this.filterTecnologia = ''
                this.Proyectos = data.Proyectos.findAll().filter(pr => pr.tecnologias.some(tec => +tec.id == +val))
            }
        }
    }
}
