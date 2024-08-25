export default {
    template: `<nav className="navbar">
        <h1>{{Titulo}} 🌎</h1>
        <ul>
            <li v-for="list in listasNav">
                <router-link v-bind:to="list.href">{{list.nombre}}</router-link>
            </li>
        </ul>
    </nav>
    <hr></hr>`,
    data(){
        return {
            Titulo: "Portfolio",
            listasNav: [
                {href: '/', nombre: 'Inicio'},
                {href: '/about', nombre: 'Sobre mi'},
                {href: '/aptitudes', nombre: 'Aptitudes'},
                {href: '/contacto', nombre: 'Contacto'},
                {href: '/proyectos', nombre: 'Proyectos'},
            ]
        }
    },
    created(){
        this.$router.push({name: 'home', path: '/'})
    }
}