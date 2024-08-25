import proyectos from './components/proyectos.js'
import home from './components/home.js'
import about from './components/about.js'
import contacto from './components/contacto.js'
import aptitudes from './components/aptitudes.js'

const { createRouter, createWebHistory} = VueRouter

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes: [
        {path: '/', name: 'home', component: home},
        {path: '/about', name: 'about', component: about},
        {path: '/contacto', name: 'contacto', component: contacto},
        {path: '/aptitudes', name: 'aptitudes', component: aptitudes},
        {path: '/proyectos', name: 'proyectos', component: proyectos}
    ]
})

export default router