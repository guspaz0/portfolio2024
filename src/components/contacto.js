export default {
    template: `
    <link href="./src/css/contacto.css" rel="stylesheet"/>
    <section className="contacto">
        <h2>{{Titulo}}</h2>
        <div className="redes">
            <span v-for="red in redes" className="card">
                <b>{{red.nombre}}</b>
                <a v-bind:href="red.href">
                    <img v-bind:src="path+red.logo" v-bind:alt="red.logo" loading="lazy"/>
                </a>
            </span>
        </div>
        <form action="mailto:gusti.paz@gmail.com?subject=this.subject?body=this.body" @on.submit.prevent="">
            <fieldset>
                <legend>Correo</legend>
                <label for="subject">Asunto:</label> 
                <input id="subject" type="text" name="subject"/>
                <label for="body">Mensaje:</label> 
                <textarea id="body" name="body" rows="10" cols="40"></textarea>
                <span className="card"><input type="submit" /></span>
            </fieldset>
        </form>
    </section>`,
    data(){
        return {
            Titulo: "Contacto",
            path: 'https://res.cloudinary.com/dbowsjk6p/image/upload/v1724456108/aptitudes/',
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
            message: '',
            subject: ''
        }
    },
    methods: {
        handleSubmit: async function (){

        }
    }
}