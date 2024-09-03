import Tecnologias from '../data/tecnologias.js'

export default {
    template: `
    <section>
        <h2>Habilidades tecnicas:</h2>
        <div className="aptitudes">
            <span v-for="skill in aptitudes" className="imgtext">
                <small>{{skill.nombre}}</small>
                <img @contextmenu.prevent="" 
                    v-if="skill.alt" v-bind:src="skill.alt" 
                    v-bind:alt="skill.nombre" 
                    loading="lazy"/>
                <img @contextmenu.prevent="" 
                    v-else v-bind:src="skill.path" 
                    v-bind:alt="skill.nombre" 
                    loading="lazy"/>
            </span>
        </div>
    </section>`,
    data: ()=> {
        return {
            aptitudes: Tecnologias.findAll()
        }
    }
}