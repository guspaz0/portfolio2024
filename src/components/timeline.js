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
                            <span>
                                <img v-show="elem.imagen" v-bind:src='elem.imagen' v-bind:alt="elem.empresa"/>    
                                <h4 v-if="elem.empresa">{{elem.empresa}}</h4>
                            </span>
                            <time>{{elem.fecha.toLocaleDateString([],{day: '2-digit', month: '2-digit', year: 'numeric'})}}
                            - {{elem.fechaFin? elem.fechaFin.toLocaleDateString([],{day: '2-digit', month: '2-digit', year: 'numeric'}) : '' }}
                            ( <b v-show="elem.tiempo.años > 0">{{elem.tiempo.años}} {{ elem.tiempo.años > 1? 'años ' : 'año ' }} </b>
                            <b v-show="elem.tiempo.años > 0 && elem.tiempo.meses > 0"> y </b>
                            <b v-show="elem.tiempo.meses > 0"> {{elem.tiempo.meses}} {{elem.tiempo.meses > 1? 'meses ' : 'mes '}} </b> )
                            </time>
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
            Linea: []
        }
    },
    mounted(){
        this.Linea = data.Experiencia.findAll()
    }
}