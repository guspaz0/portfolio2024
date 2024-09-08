export default {
    template: `<nav className="navbar">
        <ul>
            <h2>{{Titulo}} </h2>
            <li v-for="list in listasNav">
                <a v-bind:href="list.href">{{list.nombre}}</a>
            </li>
        </ul>
    </nav>`,
    data(){
        return {
            el: '#app',
            Titulo: "Portfolio",
            listasNav: [
                {href: `${window.location.pathname.split('/')[1]}`, nombre: 'Inicio'},
                {href: '#about', nombre: 'Sobre mi'},
                {href: '#aptitudes', nombre: 'Aptitudes'},
                {href: '#proyectos', nombre: 'Proyectos'},
                {href: '#certificados', nombre: 'Certificados'},
                {href: '#contacto', nombre: 'Contacto'},
            ]
        }
    },
    created(){
        this.$router.push({name: 'home', path: '/' })
    }
}