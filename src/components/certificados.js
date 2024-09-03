import Certificados from '../data/certificados.js'

export default {
    template: `
    <section>
        <h2>{{Titulo}}</h2>
        <div className="certificados">
            <article v-for="cert in Certificados">
                <b>{{cert.nombre}}</b>
                <span>
                    <img v-bind:src="cert.escuela.path" alt="cert.escuela.nombre" loading="lazy"/>
                </span>
                <b>Tecnologias:</b>
                <div className="proyectos">
                    <span v-for="tec in cert.tecnologias" className="skills">
                        <small>{{tec.nombre}}</small>
                    </span>
                </div>
                <a v-bind:href="cert.path" rel="noreferrer noopener">Certificado</a>
            </article>
        </div>
    </section>
    `,
    data(){
        return {
            Titulo: 'Certificados',
            Certificados: Certificados.findAll()
        }
    }
}