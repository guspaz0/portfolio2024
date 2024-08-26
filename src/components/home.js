import aptitudes from './aptitudes.js'
import proyectos from './proyectos.js'
import about from './about.js'
import contacto from './contacto.js'
import eventos from './eventos.js'

export default {
    template: `
    <section className="home container">
        <about :cloudurl="cloudurl"></about>
        <aptitudes :cloudurl="cloudurl"></aptitudes>
        <proyectos :cloudurl="cloudurl"></proyectos>
        <eventos :cloudurl="cloudurl"></eventos>
        <contacto :cloudurl="cloudurl"></contacto>
    </section>`,
    data(){
        return {
            cloudurl: 'https://res.cloudinary.com/dbowsjk6p/image/upload/v1724456108/aptitudes/'
        }
    },
    components: {
        'aptitudes': aptitudes,
        'proyectos': proyectos,
        'about': about,
        'contacto': contacto,
        'eventos': eventos
    }
}