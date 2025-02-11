import Aptitudes from '../services/Aptitudes.js'

export default {
    template: `
    <section v-bind:id="el">
        <h2>Tecnologias:</h2>
        <div className="carousel-container"> 
            <div className="carousel" v-bind:style="style">
            <span v-for="skill in aptitudes" >
                <img @contextmenu.prevent="" 
                    v-if="skill.alt" v-bind:src="skill.alt" 
                    v-bind:alt="skill.nombre" 
                    loading="lazy"/>
                <img @contextmenu.prevent="" 
                    v-else v-bind:src="skill.path" 
                    v-bind:alt="skill.nombre" 
                    loading="lazy"/>
                <small>{{skill.nombre}}</small>
            </span>
            </div>
        </div>
    </section>`,
    props: {
        profile: {type: Number, required: true},
    },
    data: ()=> {
        return {
            el: 'aptitudes',
            aptitudes: [],
            style: 'translate:none;rotate:none;scale:none;transform:translate3d(0px,0px,0px);',
            carousel: setInterval(()=>{},10)
        }
    },
    methods: {
        setCarousel(length){
            const anchoCarousel = length*(50+60)
            var counter = window.visualViewport.width/2
            this.carousel = setInterval(function() {
                counter--;
                if(counter < (anchoCarousel-window.visualViewport.width/2)*-1){
                    counter = window.visualViewport.width/2
                }
                let carousel = document.querySelector(".carousel")
                carousel.style.transform = `translate3d(${counter}px, 0px, 0px)`
            }, 10);
        }
    },
    watch: {
        profile(id){
            this.aptitudes = Aptitudes.findByProfile(+id);
        },
        aptitudes(curr){
            clearInterval(this.carousel);
            this.setCarousel(+curr.length)
        }
    },
    created(){
        this.aptitudes = this.profile != null
            ? Aptitudes.findByProfile(+this.profile)
            : Aptitudes.findAll()
    }
}