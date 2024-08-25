
export default {
    template: `<h2>{{Titulo}}</h2>
    <section className="about">
        <div v-bind:className="style">
            <span>
                <b>{{titulo}}</b> 
                <em>{{tituloGradient}}</em>
            </span>
            <p>{{mensaje}}</p>
            <a v-bind:href="resumeDrive">CV - Curriculum Vitae - Resume</a>
        </div>
    </section>`,
    data(){
        return {
            resumeDrive: 'https://drive.google.com/file/d/1otmq9F_jcLdmL0niyZgp1wg_EQj3YyIJ/view?usp=sharing',
            titulo: 'Hola! ',
            tituloGradient:  'Soy Desarrollador Full Stack',
            mensaje: "Ofrezco Servicios de programacion para paginas web modernas, tanto Frontend y Backend",
            style: 'overview'
        }
    },
    async mounted () {

    }
}