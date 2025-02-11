import Perfiles from '../services/Perfiles.js'

export default {
    template: `<nav v-bind:id="el" className="navbar">
        <ul>
            <h2>{{Titulo}}</h2>
            <li>
                <select name="perfil" v-model="selected" @change.prevent="$event.target.blur()">
                    <option v-for="perfil in perfiles" v-bind:value="perfil.id">
                     {{perfil.nombre}}
                    </option>
                </select>
            </li>
            <li v-for="list in listasNav">
                <a v-bind:href="list.href">{{list.nombre}}</a>
            </li>
            <li>
                <input type="checkbox" id="switch" 
                    class="checkbox" 
                    @click="this.$emit('setdarkmode')" 
                    :checked="darkmode"/>
                <label for="switch" class="toggle">
                </label>
            </li>
        </ul>
    </nav>`,
    props: ['darkmode','profile'],
    emit: ['setdarkmode', 'setProfile'],
    data(){
        return {
            el: '#nav',
            Titulo: "Portfolio",
            listasNav: [
                {href: '#inicio', nombre: 'Inicio'},
                {href: '#timeline', nombre: 'Experiencia'},
                {href: '#about', nombre: 'Sobre mi'},
                {href: '#aptitudes', nombre: 'Aptitudes'},
                {href: '#proyectos', nombre: 'Proyectos'},
                {href: '#certificados', nombre: 'Certificados'},
                {href: '#contacto', nombre: 'Contacto'},
            ],
            old: `<div className="darkmode">
                    <span v-bind:id="Switch" @click="handleSwitch" className="switch"></span>
                </div>`,
            perfiles: Perfiles.findAll(),
            selected: this.profile
        }
    },
    created(){
        window.addEventListener('scroll', this.handleScroll);
        //this.$router.push({name: 'home', path: '/' })
    },
    methods: {
        handleScroll(e){
            const scroll = window.scrollY
            if (scroll > 80) {
                this.$el.style.position = 'fixed'
                this.$el.style.height = '5%'
            }
            else {
                this.$el.style.position = 'relative'
                this.$el.style.height = 'auto'
            }
        },
        handleSelect(e){
        }
    },
    watch: {
        profile(curr) {
            this.selected = +curr
        },
        selected(curr) {
            this.$emit('setProfile', +curr);
        }
    }
}