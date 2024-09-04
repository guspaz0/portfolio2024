import Tecnologias from '../data/tecnologias.js'

export default {
    template: `
    <section v-bind:id="el">
        <h2>Tecnologias:</h2>
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
            el: 'aptitudes',
            aptitudes: Tecnologias.findAll()
        }
    }
}