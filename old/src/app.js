import pie from './components/pie.js'
import router from './router.js'

const{ createApp } = Vue

const app = createApp({
    components: {
        'pie': pie
    },
    created(){
        this.$router.push({
            name: 'home',
            path: '/'
        });
    }
})

app.use(router)

app.mount('#app')

export default app

