export default {
    template: `<nav className="navbar">
        <h2>{{Titulo}} </h2>
        <ul>
            <li v-for="list in listasNav">
                <router-link v-bind:to="list.href">{{list.nombre}}</router-link>
            </li>
        </ul>
    </nav>`,
    data(){
        return {
            Titulo: "Portfolio",
            listasNav: [
                {href: '/', nombre: 'Inicio'},
                {href: '/about', nombre: 'Sobre mi'},
                {href: '/aptitudes', nombre: 'Aptitudes'},
                {href: '/proyectos', nombre: 'Proyectos'},
                {href: '/certificados', nombre: 'Certificados'},
                {href: '/contacto', nombre: 'Contacto'},
            ]
        }
    },
    created(){
        this.$router.push({name: 'home', path: '/' })
    }
}