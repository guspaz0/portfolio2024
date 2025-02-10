import db from '../data/perfiles.js';

export default {
    template: `
    <fieldset className="perfiles">
        <legend>Selecciona un perfil</legend>
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
    `,
    props: ['profile'],
    emit: ['setProfile'],
    data() {
        return {
            perfiles: [],
            selected: +this.profile
        }
    },
    watch: {
        profile(cur) {
            this.selected = +cur
        },
        selected(cur) {
            this.$emit('setProfile', +cur)
            this.selected = +cur
        }
    },
    methods: {
        handleProfile(e){
            console.log(e)
        }
    },
    mounted() {
        this.perfiles = db.findAll();
    }
}