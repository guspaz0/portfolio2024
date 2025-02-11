import Aptitudes from '../services/Aptitudes.js'
import Proyectos from '../services/Proyectos.js'
import {Perfil} from "../models/Perfil.js";

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
            <small>Mostrando {{Proyectos.length}} de {{perfil?.proyectos.length}} Proyectos</small>
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
    props: {
        perfil: {type: Perfil, required: true, default: new Perfil(1, 'Frontend developer')}
    },
    data(){
        return {
            Titulo: "Proyectos",
            el: 'proyectos',
            Proyectos: [],
            Aptitudes: [],
            filterTecnologia: ''
        }
    },
    methods: {
        reset(){
            this.filterTecnologia = ''
            this.Proyectos = this.perfil.proyectos
        },
        showAptitudes(e){
            const skills = Array.from(e.target.parentNode.childNodes).filter(s => s.tagName === "DIALOG")
            if (e.type === "mouseenter") {
                skills[0].open = true
            } else if (e.type === "mouseleave") {
                skills[0].open = false
            }
        }
    },
    watch: {
        filterTecnologia(val){
            if (val != ''){
                this.filterTecnologia = ''
                this.Proyectos = this.perfil.proyectos
                    .filter(pr => pr.aptitudes
                        .some(tec => +tec.id === +val))
            }
        },
        perfil(curr) {
            this.Aptitudes = this.perfil.aptitudes
                .filter(apt => this.perfil.proyectos
                    .some(pr => pr.aptitudes
                        .some(prAp => prAp.id === apt.id)));
            this.Proyectos = this.perfil.proyectos.slice(0,3);
        }
    }
}
