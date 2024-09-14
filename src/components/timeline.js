import data from '../data/index.js'

export default {
    template: `<section id="timeline" className="timeline-container">
        <h2>{{Titulo}}</h2>
            <ol className="timeline">
                <li v-for="elem in Linea">
                    <div>
                        <div className="dot"></div>
                        <div>
                            <h3>{{elem.nombre}}</h3>
                            <h4 v-if="elem.empresa">{{elem.empresa}}</h4>
                            <time>{{elem.fecha.toLocaleDateString([],{day: '2-digit', month: '2-digit', year: 'numeric'})}}
                            - {{elem.fechaFin? elem.fechaFin.toLocaleDateString([],{day: '2-digit', month: '2-digit', year: 'numeric'}) : '' }}</time>
                        </div>
                        <p>{{elem.descripcion}}</p>
                    </div>
                </li>
            </ol>
            <small>Solo hago mencion a mis hitos en tecnologia</small>
    </section>`,
    data(){
        return {
            Titulo: 'Experiencia',
            timeline: 'laboral',
            Linea: [],
            Proyectos: [],
            Certificados: [],
            Laboral: [],
            filtros: `<fieldset>
                <legend>Filtros</legend>
                <label for="exp-laboral">Experiencia Laboral</label>
                <input v-model="timeline" id="exp-laboral" type="radio" name="timeline" value="laboral"/>
                <label for="proyectos">Proyectos</label>
                <input v-model="timeline" id="proyectos" type="radio" name="timeline" value="proyectos"/>
                <label for="educacion">Educacion</label>
                <input v-model="timeline" id="educacion" type="radio" name="timeline" value="educacion"/>
                <label for="todos">Todos</label>
                <input v-model="timeline" id="todos" type="radio" name="timeline" value="todos"/>
            </fieldset>`
        }
    },
    watch: {
        timeline(valActual, valAnterior){
            switch(valActual) {
                case 'laboral':
                    this.Linea = data.Experiencia.findAll()
                    break
                default:
                    break
            }
        }
    },
    mounted(){
        this.Linea = data.Experiencia.findAll()
    }
}