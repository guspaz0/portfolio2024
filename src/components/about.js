import vars from '../utils/var.js'

export default {
    template: `
    <section id="about" className="about">
        <div v-bind:className="style">
            <span>
                <b>{{titulo}}</b> 
                <em>{{tituloGradient}}</em>
            </span>
            <p>{{mensaje}}</p>
            <span className="card resume">
                <a v-bind:href="resumeDrive"> CV / Resume</a>
            </span>
        </div>
        <div className="perfil">
            <img @contextmenu.prevent="" 
                v-bind:src="cloudurl+'perfil_cv_l8xbne.png'" alt="perfil" loading="lazy"/>
            <img @contextmenu.prevent="" 
                id="flag" src="https://codingweek.org/wp-content/uploads/2023/09/chris-ried-ieic5Tq8YMk-unsplash-2048x1367.jpg" 
                alt="country flag" loading="lazy"/>
        </div>
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
    async mounted () {

    }
}