export default {
    template: `<hr></hr>
    <footer class="mainfooter">
        <span>{{author}}</span>
        <span>{{descripcion}}</span>
        <span> Contacto:{{redes}}</span>
    </footer>`,
    data(){
        return {
            author: "Gustavo Paz",
            descripcion: "Full Stack Developer",
            redes: "aqui van mis redes"
        }
    }
}