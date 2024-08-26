export default {
    template: `
    <link v-bind:href="css" rel="stylesheet"/>
    <section className="about">
        <div v-bind:className="style">
            <span>
                <b>{{titulo}}</b> 
                <em>{{tituloGradient}}</em>
            </span>
            <p>{{mensaje}}</p>
            <a v-bind:href="resumeDrive">CV - Curriculum Vitae - Resume</a>
        </div>
        <div className="perfil">
            <img v-bind:src="cloudurl+'perfil_cv_l8xbne.png'" alt="perfil" loading="lazy"/>
            <img id="flag" src="https://flagcdn.com/ar.svg" alt="country flag" loading="lazy"/>
        </div>
    </section>`,
    props: ['cloudurl'],
    data(){
        return {
            resumeDrive: 'https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing',
            titulo: 'Hola! ',
            tituloGradient:  'Soy Desarrollador Full Stack',
            mensaje: "Ofrezco Servicios de programacion para paginas web modernas, tanto Frontend y Backend",
            style: 'overview',
            css: './src/css/about.css',
        }
    },
    async mounted () {

    }
}