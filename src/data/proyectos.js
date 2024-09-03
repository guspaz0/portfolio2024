import tecnologias from "./tecnologias.js"

export default {
    data: [
        {
            id: 1,
            nombre: 'API fichadas',
            descripcion: 'Backend API Rest para obtener informacion de fichadas y setear parametros en relojes de asistencia biometricos Zkteco, de forma remota y centralizada. Tambien brinda informacion resumida de horas trabajadas para automatizar procesos internos',
            tecnologias: [ 11, 12, 13, 14, 18 ],
            repositorio: '',
            deploy: ''
        },
        {
            id: 2,
            nombre: 'La Tienda de Maria',
            descripcion: 'Proyecto tipo E-commerce sobre articulos religiosos / artesanias y dashboard con KPIs. CRUD completo, filtrado y busqueda de articulos. carrito de compras y favoritos. CRUD de Usuarios. Servicio smtp para enviar correo.',
            tecnologias: [ 11, 4, 5, 6, 8, 10, 1, 2, 18 ],
            repositorio: 'https://github.com/guspaz0/grupo3_dashboard_DH.git',
            deploy: ''
        },
        {
            id: 3,
            nombre: 'Pokedex',
            descripcion: 'Proyecto Frontend con framework Vue3 + VueRouter con scripts al estilo CDN, para crear SPA con Javascript Vanilla y ES6. Consumo de la PokeApi.',
            tecnologias: [ 3, 6],
            repositorio: 'https://github.com/guspaz0/CAC-VUE.git',
            deploy: "https://guspaz0.github.io/CAC-VUE/"
        },
        {
            id: 4,
            nombre: 'CAC Movies',
            descripcion: 'Proyecto Backend de API rest con Servlets Java. Desde el Front se puede buscar peliculas consumiendo la API de TMDB o de la API local. CRUD de peliculas y Usuarios, con encriptacion de contraseñas',
            tecnologias: [ 6, 3, 2, 16, 15, 10, 18],
            repositorio: 'https://github.com/guspaz0/Movies-FS-Java.git',
            deploy: ''
        },
        {
            id: 5,
            nombre: 'ProjUnity',
            descripcion: 'Proyecto para compartir proyectos de software y/o adquirir por via onerosa. Incluye CRUD de entidad proyecto y usuarios, dashboard con KPIs, filtrado y ordenamiento de articulos, carrito de compras, pasarela de pagos, servicio SMTP para envio de emails.',
            tecnologias: [ 6, 19, 2, 4,5,9,11,7,8],
            repositorio: 'https://github.com/guspaz0/GprojUnity.git',
            deploy: 'https://gproj-unity.vercel.app/'
        },
        {
            id: 6,
            nombre: 'PI Countries',
            descripcion: 'Proyecto de entrenamiento de bootcamps',
            tecnologias: [ 7, 4, 5, 6, 8, 9, 1, 2],
            repositorio: '',
            deploy: ''
        },{
            id: 7,
            nombre: 'PI Foods',
            descripcion: 'Proyecto de entrenamiento de bootcamps',
            tecnologias: [ 7, 4, 5, 6, 8, 9, 1, 2],
            repositorio: '',
            deploy: ''
        },
        {
            id: 8,
            nombre: 'PI Video Games',
            descripcion: 'Proyecto de entrenamiento de bootcamps',
            tecnologias: [ 7, 4, 5, 6, 8, 9, 1, 2],
            repositorio: '',
            deploy: ''
        },
        {
            id: 9,
            nombre: 'Rick & Morty',
            descripcion: 'Proyecto de entrenamiento de bootcamps',
            tecnologias: [ 7, 4, 5, 6, 8, 9, 1, 2],
            repositorio: '',
            deploy: ''
        }
    ],
    findAll: function (){
        return this.data.map(pr => {
            return {
                ...pr, 
                tecnologias: pr.tecnologias.map(id => tecnologias.findOne(id))
            }
        })
    },
    findOne: function(id) {
        const proyecto = this.data.find(proyect => proyect.id == id)
        if (proyecto) {
            return {
                ...proyecto, 
                tecnologias: proyecto.tecnologias.map(id => tecnologias.findOne(id))
            }
        } else throw new Error('No se encontró el proyecto')
    }
}