import tecnologias from "./tecnologias.js"

export default {
    data: [
        {
            id: 1,
            nombre: 'API fichadas', 
            descripcion: 'Backend API Rest para obtener informacion de fichadas y setear parametros en relojes de asistencia biometricos Zkteco, de forma remota y centralizada. Tambien brinda informacion resumida de horas trabajadas para automatizar procesos internos',
            tecnologias: [ 11, 12, 13, 14 ],
            repositorio: '',
            deploy: ''
        },
        {
            id: 2,
            nombre: 'La Tienda de Maria', 
            descripcion: 'Proyecto tipo E-commerce sobre articulos religiosos / artesanias y dashboard con KPIs. CRUD completo, filtrado y busqueda de articulos. carrito de compras y favoritos. CRUD de Usuarios. Servicio smtp para enviar correo.',
            tecnologias: [ 11, 4, 5, 6, 8, 10, 1, 2 ],
            repositorio: '',
            deploy: ''
        },
        {
            id: 3,
            nombre: 'Pokedex', 
            descripcion: 'Proyecto Frontend con framework Vue3 + VueRouter con scripts al estilo CDN, para crear SPA con Javascript Vanilla y ES6. Consumo de la PokeApi.',
            tecnologias: [ 3, 6],
            repositorio: '',
            deploy: "https://guspaz0.github.io/CAC-VUE/"
        },
        {
            id: 4,
            nombre: 'CAC Movies', 
            descripcion: 'Proyecto Backend de API rest con Servlets Java. Desde el Front se puede buscar peliculas consumiendo la API de TMDB o de la API local. CRUD de peliculas y Usuarios, con encriptacion de contraseñas',
            tecnologias: [ 6, 3, 2, 16, 15, 10],
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