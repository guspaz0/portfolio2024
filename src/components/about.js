import vars from '../utils/var.js'

export default {
    template: `
    <h2>Sobre mi</h2>
    <section id="about" className="about">
        <span>
            <p>{{mensaje}}</p>
            <p>{{parrafo2}}</p>
            <a v-bind:href="resumeDrive" rel="noreferrer noopener">
                <span className="card resume">
                    CV / Resume
                </span>
            </a>
        </span>
        <div className="perfil">
            <span className="">
                <img @contextmenu.prevent="" 
                    v-bind:src="cloudurl+'perfil_cv_l8xbne.png'" alt="perfil" loading="lazy"/>
                <div className="shadow"></div>
            </span>
            <img @contextmenu.prevent="" 
                id="flag" src="https://codingweek.org/wp-content/uploads/2023/09/chris-ried-ieic5Tq8YMk-unsplash-2048x1367.jpg" 
                alt="country flag" loading="lazy"/>
        </div>
    </section>`,
    data(){
        return {
            resumeDrive: 'https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing',
            mensaje: "Desde que era niño me gustó jugar en las computadoras y me sumergi en este apasionante mundo de la computacion. Hoy en dia me considero un entusiasta de la informatica.",
            parrafo2: 'Soy una persona proactiva, curiosa, flexible y perseverante. Nunca paro de aprender.',
            style: 'overview',
            cloudurl: vars.cloudurl
        }
    },
    async mounted () {

    }
}