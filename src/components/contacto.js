import vars from '../utils/var.js'

export default {
    template: `
    <section className="contacto">
        <h2>{{Titulo}}</h2>
        <div className="redes">
            <span v-for="red in redes" className="card">
                <b>{{red.nombre}}</b>
                <a v-bind:href="red.href">
                    <img v-bind:src="cloudurl+red.logo" v-bind:alt="red.logo" loading="lazy"/>
                </a>
            </span>
        </div>
        <form @submit.prevent="handleSubmit">
            <fieldset>
                <legend>Correo</legend>
                <label for="subject">Asunto:</label> 
                <input v-model="subject" id="subject" type="text" name="subject"/>
                <label for="body">Mensaje:</label> 
                <textarea v-model="body" id="body" name="body" rows="10" cols="40"></textarea>
                <span className="card" @click="handleSubmit"><input type="submit"/></span>
            </fieldset>
        </form>
    </section>`,
    data(){
        return {
            cloudurl: vars.cloudurl,
            Titulo: "Contacto",
            redes: [
                {
                    nombre: 'LinkedIn', 
                    logo: 'Logo-Linkedin_sjw3ee.png',
                    href: 'https://www.linkedin.com/in/gustavo-rodolfo-paz-767951118/'
                },{   
                    nombre: 'Github', 
                    logo: 'github_logo_xodefl.png',
                    href: 'https://github.com/guspaz0'
                }
            ],
            body: '',
            subject: ''
        }
    },
    watch: {
        body(value){
            this.message = value
        },
        subject(value) {
            this.subject = value
        }
    },
    methods: {
        handleSubmit: async function (){
            open(`mailto:gusti.paz@gmail.com?subject=${this.subject}?body=${this.body}`)
        }
    }
}