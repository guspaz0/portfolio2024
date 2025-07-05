export default {
    template: `
    <footer class="mainfooter">
        <span>Portfolio 2024 - Desarrollador Web Full Stack </span>
        <router-link v-bind:to="rootPath+'/contacto'"><b>Contacto</b></router-link>
        <span><b>Author: </b>{{author}}</span>
    </footer>`,
    data(){
        return {
            author: "Gustavo R. Paz",
            descripcion: "Full Stack Developer",
            rootPath: window.location.pathname.split('/')[1]
        }
    }
}