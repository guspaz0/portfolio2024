import Experiencias from '../services/Experiencias.js'
import {Perfil} from '../models/Perfil.js'

export default {
    template: `<section id="timeline" className="timeline-container">
        <h2>{{Titulo}}</h2>
            <ol v-if="Linea.length > 0" className="timeline">
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
                            ( <b v-show="elem.duracion.años > 0">{{elem.duracion.años}} {{ elem.duracion.años > 1? 'años ' : 'año ' }} </b>
                            <b v-show="elem.duracion.años > 0 && elem.duracion.meses > 0"> y </b>
                            <b v-show="elem.duracion.meses > 0"> {{elem.duracion.meses}} {{elem.duracion.meses > 1? 'meses ' : 'mes '}} </b> )
                            </time>
                        </div>
                        <p>{{elem.descripcion}}</p>
                    </div>
                </li>
            </ol>
            <p v-if="Linea.length === 0">No hay experiencias disponibles para {{perfil.nombre}}</p>
            <small>Solo hago mencion a mis hitos en tecnologia</small>
    </section>`,
    props: {
        perfil: {type: Perfil, required: true}
    },
    data(){
        return {
            Titulo: 'Experiencia',
            Linea: []
        }
    },
    watch: {
        perfil(curr) {
            this.Linea = curr.experiencias
        }
    }
}