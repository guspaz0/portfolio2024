import navmain from './components/nav.js'
import pie from './components/pie.js'
import router from './router.js'

const{ createApp } = Vue

const app = createApp({
    components: {
        'navmain': navmain,
        'pie': pie
    },
    data() {
        return {
            darkmode: false
        }
    },
    methods: {
        setdarkmode(){
            this.darkmode = !this.darkmode
        },
        colorSchema(mode) {
            return window.matchMedia(`(prefers-color-scheme: ${mode})`).matches
        }
    },
    watch: {
        darkmode(val){
            const appTheme = document.documentElement
            if (val) {
                appTheme.classList.add('light')
                appTheme.classList.remove('dark') 
            } else {
                appTheme.classList.remove('light')
                appTheme.classList.add('dark') 
            }
        }
    },
    mounted(){
        const appTheme = document.documentElement
        if (this.colorSchema('dark')) {
            this.darkmode = false
            appTheme.classList.remove('light')
            appTheme.classList.add('dark') 
        }
        else {
            this.darkmode = true
            appTheme.classList.remove('light')
            appTheme.classList.add('dark') 
        }
    }
})

app.use(router)

app.mount('#app')

