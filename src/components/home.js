import aptitudes from './aptitudes.js'
import proyectos from './proyectos.js'
import about from './about.js'
import contacto from './contacto.js'

export default {
    template: `
    <link href="./src/css/home.css" rel="stylesheet"/>
    <section className="home container">
        <about></about>
        <contacto></contacto>
        <aptitudes></aptitudes>
        <proyectos></proyectos>
    </section>`,
    data(){

    },
    async mounted () {

    },
    components: {
        'aptitudes': aptitudes,
        'proyectos': proyectos,
        'about': about,
        'contacto': contacto
    }
}