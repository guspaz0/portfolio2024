import proyectos from './components/proyectos.js'
import home from './components/home.js'
import about from './components/about.js'
import contacto from './components/contacto.js'
import aptitudes from './components/aptitudes.js'
import eventos from './components/eventos.js'
import certificados from './components/certificados.js'

const { createRouter, createWebHistory} = VueRouter

const queryParam = new URLSearchParams(window.location.search)

const root = window.location.pathname

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes: [
        {path: `${root}`, name: 'home', component: home, props: {perfil: queryParam.get('perfil') || 1}},
        {path: `${root}/about`, name: 'about', component: about},
        {path: `${root}/contacto`, name: 'contacto', component: contacto},
        {path: `${root}/aptitudes`, name: 'aptitudes', component: aptitudes},
        {path: `${root}/proyectos`, name: 'proyectos', component: proyectos},
        {path: `${root}/eventos`, name: 'eventos', component: eventos},
        {path: `${root}/certificados`, name: 'certificados', component: certificados}
    ]
})

export default router