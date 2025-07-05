import Eventos from '../services/Eventos.js'

export default {
    template: `
    <section id="eventos" className="eventos">
        <h2>{{Titulo}}</h2>
        <div className="proyectos" @contextmenu.prevent="">
            <article v-for="event in Eventos">
                <span className="img" v-bind:style="'background-image:linear-gradient(to bottom, rgba(109, 105, 105, 0.655), rgba(109, 105, 105, 0.1)), url('+event.imagen+');'"></span>
                <h2>{{event.titulo}}</h2>
                <p>{{event.descripcion}}</p>
            </article>
        </div>
    </section>
    `,
    data(){
        return {
            Titulo: 'Eventos',
            Eventos: Eventos.findAll()
        }
    }
}