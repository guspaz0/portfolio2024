export default {
    template: `<h2>{{Titulo}}</h2>
    <link href="./src/css/contacto.css" rel="stylesheet"/>
    <section className="contacto">
        <div className="redes">
            <span v-for="red in redes" className="card">
                <b>{{red.nombre}}</b>
                <a v-bind:href="red.href">
                    <img v-bind:src="path+red.logo" v-bind:alt="red.logo" loading="lazy"/>
                </a>
            </span>
        </div>
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
            ]
        }
    }
}