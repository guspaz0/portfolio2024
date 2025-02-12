import navmain from './nav.js'
import about from './about.js'
import contacto from './contacto.js'
import eventos from './eventos.js'
import timeline from './timeline.js'
import vars from '../utils/var.js'
import perfiles from './perfiles.js'

export default {
    template: `
    <navmain 
        :darkmode="darkmode" @setdarkmode="setdarkmode"
        :profile="profile" @setProfile="setProfile"
    ></navmain>
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
        <perfiles :profile="profile" @setProfile="setProfile"></perfiles>
        <timeline></timeline>
        <about></about>
        <contacto></contacto>
    </section>`,
    data(){
        return {
            darkmode: false,
            resumeDrive: 'https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing',
            titulo: 'Hola! Soy Gustavo Paz ',
            tituloGradient:  'Desarrollador de Software',
            mensaje: "Selecciona un perfil para mostrar informacion pertinente",
            style: 'overview',
            cloudurl: vars.cloudurl,
            profile: null
        }
    },
    methods: {
        setdarkmode(){
            this.darkmode = !this.darkmode
        },
        colorSchema(mode) {
            return window.matchMedia(`(prefers-color-scheme: ${mode})`).matches
        },
        setProfile(id){
            sessionStorage.setItem('profileId', id)
            this.profile = +id
        }
    },
    watch:{
        profile(e) {
        },
        darkmode(val){
            const appTheme = document.documentElement
            if (val) {
                appTheme.classList.add('light')
                appTheme.classList.remove('dark')
            } else {
                appTheme.classList.remove('light')
                appTheme.classList.add('dark')
            }
        }
    },
    mounted(){
        const appTheme = document.documentElement
        if (this.colorSchema('dark')) {
            this.darkmode = false
            appTheme.classList.remove('light')
            appTheme.classList.add('dark')
        }
        else {
            this.darkmode = true
            appTheme.classList.remove('light')
            appTheme.classList.add('dark')
        }
        this.profile = sessionStorage.getItem('profile') || 1;
    },
    components: {
        'navmain': navmain,
        'about': about,
        'contacto': contacto,
        'eventos': eventos,
        'timeline': timeline,
        'perfiles': perfiles
    }
}