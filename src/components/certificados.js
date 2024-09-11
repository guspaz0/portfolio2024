import data from '../data/index.js'

export default {
    template: `
    <section id="certificados">
        <h2>{{Titulo}}</h2>
        <form>
            <fieldset>
                <legend>Filtros</legend>
                <label for="filterEsc">Escuela:</label>
                <select id="filterEsc" v-model="filterEscuela">
                    <option v-for="esc in Escuelas" v-bind:value="esc.id">
                    {{esc.nombre}}
                    </option>
                </select>
                <label for="filterTec">Aptitud:</label>
                <select id="filterTec" v-model="filterTecnologia">
                    <option v-for="tec in Aptitudes" v-bind:value="tec.id">
                    {{tec.nombre}} ({{tec.countCertificados}})
                    </option>
                </select>
            </fieldset>
            <small>Mostrando {{Certificados.length}} de {{totalCertificados}} Certificados</small>
            <span className="card" @click.prevent="reset">Ver Todos</span>
        </form>
        <div className="certificados">
            <p v-if="Certificados.length == 0">No hay certificados con la Escuela/Aptitud seleccionada</p>
            <article v-for="cert in Certificados" @contextmenu.prevent="" >
                <b>{{cert.nombre}}</b>
                <span>
                    <img v-bind:src="cert.escuela.path" alt="cert.escuela.nombre" loading="lazy"/>
                </span>
                <b>Tecnologias:</b>
                <div className="proyectos">
                    <span v-for="tec in cert.aptitudes.slice(0,2)" className="skills" @contextmenu.prevent="" >
                        <small>{{tec.nombre}}</small>
                        <img v-bind:src="tec.path" v-bind:alt="tec.nombre" loading="lazy"/>
                    </span>
                    <span v-if="cert.aptitudes.length > 2" className="skills" @mouseenter.prevent="showAptitudes" @contextmenu.prevent="" >
                        <b>+{{cert.aptitudes.length-2}}</b>
                    </span>
                    <dialog v-if="cert.aptitudes.length > 3" @mouseleave.prevent="showAptitudes" @contextmenu.prevent="" >
                        <span v-for="tec in cert.aptitudes" className="skills">
                            <small>{{tec.nombre}}</small>
                            <img v-bind:src="tec.path" v-bind:alt="tec.nombre" loading="lazy"/>
                        </span>
                    </dialog>
                </div>
                <a v-bind:href="cert.path" rel="noreferrer noopener">Certificado</a>
            </article>
        </div>
    </section>
    `,
    data(){
        return {
            Titulo: 'Certificados',
            Certificados: [],
            totalCertificados: data.Certificados.data.length,
            Escuelas: [],
            Aptitudes: [],
            filterEscuela: '',
            filterTecnologia: '',
        }
    },
    mounted(){
        this.Certificados = data.Certificados.findAll().slice(0,3)
        this.Aptitudes = data.Aptitudes.findAll().filter(apt => data.Certificados.data.some(cert => cert.aptitudes.includes(apt.id)))
        this.Escuelas = data.Escuelas.findAll().filter(apt => data.Certificados.data.some(cert => cert.escuela == apt.id))
    },
    methods: {
        reset(){
            this.filterTecnologia = ''
            this.filterEscuela = ''
            this.Certificados = data.Certificados.findAll()
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
        filterEscuela(val){
            if (val != ''){
                this.filterTecnologia = ''
                this.Certificados = data.Certificados.findAll().filter(cert => +cert.escuela.id == +val)
            }
        },
        filterTecnologia(val){
            if (val != ''){
                this.filterEscuela = ''
                this.Certificados = data.Certificados.findAll().filter(cert => cert.aptitudes.some(tec => tec.id == +val))
            }
        }
    }
}