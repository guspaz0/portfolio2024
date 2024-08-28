import Tecnologias from '../data/tecnologias.js'

export default {
    template: `
    <section>
        <h2>Habilidades tecnicas:</h2>
        <div className="aptitudes">
            <span v-for="skill in aptitudes" className="imgtext">
                <small>{{skill.nombre}}</small>
                <img v-bind:src="skill.path" v-bind:alt="skill.nombre" loading="lazy"/>
            </span>
        </div>
    </section>`,
    data: ()=> {
        return {
            aptitudes: Tecnologias.findAll()
        }
    }
}