
import about from './about.js'
import contacto from './contacto.js'
import eventos from './eventos.js'
import timeline from './timeline.js'
import vars from '../utils/var.js'
import perfiles from './perfiles.js'

export default {
    template: `
    <section className="home container">
        <section id="inicio" className="about">
            <div v-bind:className="style">
                <span>
                    <p>{{titulo}}</p> 
                    <em>{{tituloGradient}}</em>
                </span>
                <p>{{mensaje}}</p>
            </div>
        </section>
        <perfiles :profile="profile" @setProfile="this.$emit('setProfile',$event)"></perfiles>
        <timeline></timeline>
        <about></about>
        <contacto></contacto>
    </section>`,
    props: {
        profile: {type: Number, required: true}
    },
    emit: ['setProfile'],
    data(){
        return {
            darkmode: false,
            resumeDrive: 'https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing',
            titulo: 'Hola! Soy Gustavo Paz ',
            tituloGradient:  'Desarrollador de Software',
            mensaje: "Selecciona un perfil asi puedo mostrarte la informacion pertinente a cada uno",
            style: 'overview',
            cloudurl: vars.cloudurl
        }
    },
    watch:{
        profile(e) {
        }
    },
    mounted(){
    },
    components: {

        'about': about,
        'contacto': contacto,
        'eventos': eventos,
        'timeline': timeline,
        'perfiles': perfiles
    }
}