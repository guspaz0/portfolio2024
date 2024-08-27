import aptitudes from './aptitudes.js'
import proyectos from './proyectos.js'
import about from './about.js'
import contacto from './contacto.js'
import eventos from './eventos.js'

export default {
    template: `
    <section className="home container">
        <about></about>
        <proyectos></proyectos>
        <aptitudes></aptitudes>
        <eventos></eventos>
        <contacto></contacto>
    </section>`,
    components: {
        'aptitudes': aptitudes,
        'proyectos': proyectos,
        'about': about,
        'contacto': contacto,
        'eventos': eventos
    }
}