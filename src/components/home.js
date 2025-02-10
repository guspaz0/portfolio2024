import aptitudes from './aptitudes.js'
import proyectos from './proyectos.js'
import about from './about.js'
import contacto from './contacto.js'
import eventos from './eventos.js'
import certificados from './certificados.js'
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
        <certificados :profile="profile"></certificados>
        <proyectos :profile="profile"></proyectos>
        <aptitudes :profile="profile"></aptitudes>
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
            tituloGradient:  'Desarrollador Full Stack',
            mensaje: "Ofrezco Servicios de programacion para paginas web modernas, tanto Frontend y Backend",
            style: 'overview',
            cloudurl: vars.cloudurl
        }
    },
    watch:{
        profile(e) {
            console.log("linea 60: home: "+ e)
        }
    },
    mounted(){
      // setInterval(()=> {
      //     let sessionProf = sessionStorage.getItem('profileId');
      //     if(this.profile !== sessionProf) {
      //           this.profile = sessionProf;
      //     }
      // })
    },
    components: {
        'aptitudes': aptitudes,
        'proyectos': proyectos,
        'about': about,
        'contacto': contacto,
        'eventos': eventos,
        'certificados': certificados,
        'timeline': timeline,
        'perfiles': perfiles
    }
}