import perfiles from '../services/Perfiles.js';
import aptitudes from './aptitudes.js'
import proyectos from './proyectos.js'
import certificados from "./certificados.js";

export default {
    template: `
    <fieldset className="perfiles">
        <legend>Perfiles</legend>
        <span v-for="perfil in perfiles">
            <input 
                type="radio" 
                name="selected" 
                v-bind:id="'perfil'+perfil.id"
                v-model="selected"
                v-bind:value="perfil.id"
            />
            <label v-bind:for="'perfil'+perfil.id">{{perfil.nombre}}</label>
        </span>
    </fieldset>
    <certificados :perfil="perfil"></certificados>
    <proyectos :perfil="perfil"></proyectos>
    <aptitudes :perfil="perfil"></aptitudes>
    `,
    props: ['profile'],
    emit: ['setProfile'],
    data() {
        return {
            perfiles: [],
            selected: +this.profile,
            perfil: null
        }
    },
    watch: {
        profile(cur) {
            this.selected = +cur
        },
        selected(curr) {
            this.$emit('setProfile', +curr)
            this.selected = +curr
            this.perfil = this.perfiles.find(perfil => perfil.id === +curr)
        }
    },
    methods: {
        handleProfile(e){
            console.log(e)
        }
    },
    mounted() {
        this.perfiles = perfiles.findAll();
    },
    components: {
        'aptitudes': aptitudes,
        'proyectos': proyectos,
        'certificados': certificados
    }
}