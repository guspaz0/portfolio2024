import aptitudes from './aptitudes.js'
import proyectos from './proyectos.js'
import about from './about.js'
import contacto from './contacto.js'
import eventos from './eventos.js'
import certificados from './certificados.js'
import timeline from './timeline.js'
import vars from '../utils/var.js'

export default {
    template: `
    <section className="home container">
        <section id="inicio" className="about">
            <div v-bind:className="style">
                <span>
                    <b>{{titulo}}</b> 
                    <em>{{tituloGradient}}</em>
                </span>
                <p>{{mensaje}}</p>
            </div>
        </section>
        
        <timeline></timeline>
        <certificados></certificados>
        <proyectos></proyectos>
        <aptitudes></aptitudes>
        <about></about>
        <contacto></contacto>
    </section>`,
    data(){
        return {
            resumeDrive: 'https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing',
            titulo: 'Hola! ',
            tituloGradient:  'Soy Desarrollador Full Stack',
            mensaje: "Ofrezco Servicios de programacion para paginas web modernas, tanto Frontend y Backend",
            style: 'overview',
            cloudurl: vars.cloudurl
        }
    },
    components: {
        'aptitudes': aptitudes,
        'proyectos': proyectos,
        'about': about,
        'contacto': contacto,
        'eventos': eventos,
        'certificados': certificados,
        'timeline': timeline
    }
}