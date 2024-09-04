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
                <label for="filterTec">Tecnologia:</label>
                <select id="filterTec" v-model="filterTecnologia">
                    <option v-for="tec in Tecnologias" v-bind:value="tec.id">
                    {{tec.nombre}}
                    </option>
                </select>
            </fieldset>
            <span className="card" @click.prevent="reset">Reset</span>
        </form>

        <div className="certificados">
            <article v-for="cert in Certificados">
                <b>{{cert.nombre}}</b>
                <span>
                    <img v-bind:src="cert.escuela.path" alt="cert.escuela.nombre" loading="lazy"/>
                </span>
                <b>Tecnologias:</b>
                <div className="proyectos">
                    <span v-for="tec in cert.tecnologias" className="skills">
                        <small>{{tec.nombre}}</small>
                    </span>
                </div>
                <a v-bind:href="cert.path" rel="noreferrer noopener">Certificado</a>
            </article>
        </div>
    </section>
    `,
    data(){
        return {
            Titulo: 'Certificados',
            Certificados: data.Certificados.findAll(),
            Escuelas: data.Escuelas.findAll(),
            Tecnologias: data.Tecnologias.findAll(),
            filterEscuela: '',
            filterTecnologia: '',
        }
    },
    methods: {
        reset(){
            this.filterTecnologia = ''
            this.filterEscuela = ''
            this.Certificados = data.Certificados.findAll()
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
                this.Certificados = data.Certificados.findAll().filter(cert => cert.tecnologias.some(tec => tec.id == +val))
            }
        }
    }
}