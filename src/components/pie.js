export default {
    template: `<hr></hr>
    <footer class="mainfooter">
        <span>Portfolio 2024 - Desarrollador Web Full Stack </span>
        <router-link to="/contacto"><b>Contacto</b></router-link>
        <span><b>Author: </b>{{author}}</span>
    </footer>`,
    data(){
        return {
            author: "Gustavo R. Paz",
            descripcion: "Full Stack Developer",
        }
    }
}