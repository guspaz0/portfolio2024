import data from '../data/index.js'

export default {
    template: `
    <section v-bind:id="el">
        <h2>{{Titulo}}</h2>
        <form>
            <fieldset>
                <legend>Filtros</legend>
                <label for="filterTec">Aptitud:</label>
                <select id="filterTec" v-model="filterTecnologia">
                    <option v-for="tec in Aptitudes" v-bind:value="tec.id">
                    {{tec.nombre}} ({{tec.countProyects}})
                    </option>
                </select>
            </fieldset>
            <small>Mostrando {{Proyectos.length}} de {{totalProyects}} Proyectos</small>
            <span className="card" @click.prevent="reset">Ver Todos</span>
        </form>
        <div v-bind:className="el">
            <p v-if="Proyectos.length == 0">No hay proyectos con la Aptitud seleccionada</p>
            <article v-for="pr in Proyectos" @contextmenu.prevent="" >
                <span className="img" v-bind:style="'background-image:linear-gradient(to bottom, rgba(109, 105, 105, 0.655), rgba(109, 105, 105, 0.1)), url('+pr.imagen+');'">
                </span>
                <h2>{{pr.nombre}}</h2>
                <p>{{pr.descripcion}}</p>
                <b>Tecnologias:</b>
                <div className="proyectos">
                    <span v-for="tec in pr.aptitudes.slice(0,2)" className="skills" @contextmenu.prevent="" >
                        <small>{{tec.nombre}}</small>
                        <img v-bind:src="tec.path" v-bind:alt="tec.nombre" loading="lazy"/>
                    </span>
                    <span v-if="pr.aptitudes.length > 2" className="expand" @mouseenter.prevent="showAptitudes" @contextmenu.prevent="" >
                        <b>+{{pr.aptitudes.length-2}}</b>
                    </span>
                    <dialog v-if="pr.aptitudes.length > 3" @mouseleave.prevent="showAptitudes" @contextmenu.prevent="" >
                        <span v-for="tec in pr.aptitudes" className="skills">
                            <small>{{tec.nombre}}</small>
                            <img v-bind:src="tec.path" v-bind:alt="tec.nombre" loading="lazy"/>
                        </span>
                    </dialog>
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
            Proyectos: [],
            Aptitudes: [],
            totalProyects: data.Proyectos.data.length,
            filterTecnologia: ''
        }
    },
    mounted(){
        this.Aptitudes = data.Aptitudes.findAll()
            .filter(apt => data.Proyectos.data.some(pr => pr.aptitudes.includes(apt.id)));
        this.Proyectos = data.Proyectos.findAll().slice(0,3);
    },
    methods: {
        reset(){
            this.filterTecnologia = ''
            this.Proyectos = data.Proyectos.findAll()
        },
        showAptitudes(e){
            const skills = Array.from(e.target.parentNode.childNodes).filter(s => s.tagName == "DIALOG")
            if (e.type == "mouseenter") {
                skills[0].open = true
            } else if (e.type == "mouseleave") {
                skills[0].open = false
            }
        }
    },
    watch: {
        filterTecnologia(val){
            if (val != ''){
                this.filterTecnologia = ''
                this.Proyectos = data.Proyectos.findAll().filter(pr => pr.aptitudes.some(tec => +tec.id == +val))
            }
        }
    }
}
