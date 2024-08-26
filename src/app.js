import navmain from './components/nav.js'
import pie from './components/pie.js'
import router from './router.js'

const{ createApp } = Vue

const app = createApp({
    components: {
        'navmain': navmain,
        'pie': pie
    }
})

app.use(router)

app.mount('#app')

