import Aptitudes from '../data/aptitudes.js'

export default {
    template: `
    <section v-bind:id="el">
        <h2>Tecnologias:</h2>
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
            </span>
        </div>

    </section>`,
    data: ()=> {
        return {
            el: 'aptitudes',
            aptitudes: Aptitudes.findAll(),
            style: 'translate:none;rotate:none;scale:none;transform:translate3d(0px,0px,0px);',
        }
    },
    methods: {
        carousel(){
            const anchoCarousel = Aptitudes.findAll().length*(50+60)
            var counter = window.visualViewport.width/2
            setInterval(function() {
                counter--;
                if(counter < (anchoCarousel-window.visualViewport.width/2)*-1){
                    counter = window.visualViewport.width/2
                }
                let carousel = document.querySelector(".carousel")
                carousel.style.transform = `translate3d(${counter}px, 0px, 0px)`
            }, 10);
        }
    }, 
    mounted(){
        this.carousel()
    }
}