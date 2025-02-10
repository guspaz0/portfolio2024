import navmain from './components/nav.js'
import pie from './components/pie.js'
//import router from './router.js'
import home from './components/home.js'

const{ createApp } = Vue

const app = createApp({
    template: `
        <navmain 
            :darkmode="darkmode" @setdarkmode="setdarkmode"
            :profile="profile" @setProfile="setProfile"
        ></navmain>
        <home :profile="profile" @setProfile="setProfile"></home>
        <pie></pie>
    `,
    components: {
        'navmain': navmain,
        'pie': pie,
        'home': home
    },
    data() {
        return {
            darkmode: false,
            profile: null
        }
    },
    methods: {
        setdarkmode(){
            this.darkmode = !this.darkmode
        },
        colorSchema(mode) {
            return window.matchMedia(`(prefers-color-scheme: ${mode})`).matches
        },
        setProfile(id){
            sessionStorage.setItem('profileId', id)
            this.profile = +id
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
        this.profile = sessionStorage.getItem('profile') || 1;
    }
})

//app.use(router)

app.mount('#app')

export default app

