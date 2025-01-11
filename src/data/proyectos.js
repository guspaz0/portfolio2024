import Aptitudes from "./aptitudes.js"
import vars from "../utils/var.js"

export default {
    data: [
        {
            id: 1,
            nombre: 'API fichadas',
            descripcion: 'Backend API Rest para obtener informacion de fichadas y setear parametros en relojes de asistencia biometricos Zkteco, de forma remota y centralizada. Tambien brinda informacion resumida de horas trabajadas para automatizar procesos internos',
            aptitudes: [ 1, 12, 13, 14, 18,4,5,6,8,9,11 ],
            fecha: new Date(),
            imagen: 'fichadas_beqpmi.png',
            repositorio: 'https://github.com/guspaz0/api-relojes',
            deploy: ''
        },
        {
            id: 2,
            nombre: 'La Tienda de Maria',
            descripcion: 'Proyecto tipo E-commerce sobre articulos religiosos / artesanias y dashboard con KPIs. CRUD completo, filtrado y busqueda de articulos. carrito de compras y favoritos. CRUD de Usuarios. Servicio smtp para enviar correo.',
            aptitudes: [ 1, 4, 5, 6, 8, 10, 11, 2, 18, 24, 25, 26 ],
            fecha: new Date(),
            imagen: 'La_tienda_de_maria_ssxsn2.png',
            repositorio: 'https://github.com/guspaz0/grupo3_dashboard_DH.git',
            deploy: ''
        },
        {
            id: 3,
            nombre: 'ProjUnity',
            descripcion: 'Proyecto para compartir proyectos de software y/o adquirir por via onerosa. Incluye CRUD de entidad proyecto y usuarios, dashboard con KPIs, filtrado y ordenamiento de articulos, carrito de compras, pasarela de pagos, servicio SMTP para envio de emails.',
            aptitudes: [ 6, 19, 2, 4,5,9,11,7,8,24,25],
            fecha: new Date(),
            imagen: 'projunity_oyh8x9.png',
            repositorio: 'https://github.com/guspaz0/GprojUnity.git',
            deploy: 'https://gproj-unity.vercel.app/'
        },
        {
            id: 4,
            nombre: 'Pokedex',
            descripcion: 'Proyecto Frontend con framework Vue3 + VueRouter con scripts al estilo CDN, para crear SPA con Javascript Vanilla y ES6. Consumo de la PokeApi.',
            aptitudes: [ 3, 6,24,25],
            fecha: new Date(),
            imagen: 'pokeapi_vue_prir8h.png',
            repositorio: 'https://github.com/guspaz0/CAC-VUE.git',
            deploy: "https://guspaz0.github.io/CAC-VUE/"
        },
        {
            id: 5,
            nombre: 'CAC Movies',
            descripcion: 'Proyecto Backend de API rest con Servlets Java. Desde el Front se puede buscar peliculas consumiendo la API de TMDB o de la API local. CRUD de peliculas y Usuarios, con encriptacion de contraseñas',
            aptitudes: [ 16, 3, 2, 6, 10, 18,24,25],
            fecha: new Date(),
            imagen: 'cac-Movies_zltzex.png',
            repositorio: 'https://github.com/guspaz0/Movies-FS-Java.git',
            deploy: ''
        },
        {
            id: 6,
            nombre: 'PI Countries',
            descripcion: 'Proyecto de entrenamiento de bootcamps',
            aptitudes: [ 7, 4, 5, 6, 8, 9, 1, 2,24,25],
            fecha: new Date(),
            imagen: 'countries_mnuxdc.jpg',
            repositorio: '',
            deploy: ''
        },{
            id: 7,
            nombre: 'PI Foods',
            descripcion: 'Proyecto de entrenamiento de bootcamps',
            aptitudes: [ 1, 4, 5, 6, 8, 9, 7, 2,24,25],
            fecha: new Date(),
            imagen: 'food_pi_oghuxf.jpg',
            repositorio: '',
            deploy: ''
        },
        {
            id: 8,
            nombre: 'PI Video Games',
            descripcion: 'Proyecto de entrenamiento de bootcamps',
            aptitudes: [ 1, 4, 5, 6, 8, 9, 7, 2,24,25],
            fecha: new Date(),
            imagen: '',
            repositorio: '',
            deploy: ''
        },
        {
            id: 9,
            nombre: 'Rick & Morty',
            descripcion: 'Proyecto de entrenamiento de bootcamps',
            aptitudes: [ 1, 4, 5, 6, 8, 9, 7, 2,24,25],
            fecha: new Date(),
            imagen: 'rick_morty_om7ayj.jpg',
            repositorio: '',
            deploy: ''
        }
    ],
    findAll: function (){
        return this.data.map(pr => {
            return {
                ...pr, 
                aptitudes: pr.aptitudes.map(id => Aptitudes.findOne(id)),
                imagen: pr.imagen? vars.proyectourl+pr.imagen : ''
            }
        })
    },
    findOne: function(id) {
        const proyecto = this.data.find(proyect => proyect.id == id)
        if (proyecto) {
            return {
                ...proyecto, 
                aptitudes: proyecto.aptitudes.map(id => Aptitudes.findOne(id)),
                imagen: vars.proyectourl+proyecto.imagen
            }
        } else throw new Error('No se encontró el proyecto')
    }
}