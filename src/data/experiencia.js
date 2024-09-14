export default {
    data: [
        {
            id: 1,
            nombre: 'Tecnico en reparacion de PC',
            descripcion: 'Soporte, reparacion y mantenimiento de equipos informaticos y moviles para una empresa dedicada a la venta y distribucion de productos alimenticios.',
            empresa: 'GyA Distribuciones SRL',
            logoEmpresa: '',
            fecha: new Date(2010,10,1),
            fechaFin: new Date(2019,10,1)
        },
        {
            id: 2,
            nombre: 'Pasante Tecnico universitario en redes de computadoras',
            descripcion: 'Diseño, cableado e instalacion de infraestructura de equipos de redes informaticas para una reconocida Obra Social provincial. configuracion de switches/routers de capa 3 y 7',
            empresa: 'Instituto de obra social del empleado provincial de santiago del estero (IOSEP)',
            logoEmpresa: '',
            fecha: new Date(2010,8,1),
            fechaFin: new Date(2010,10,30)
        },
        {
            id: 3,
            nombre: 'Desarrollador Full stack independiente',
            descripcion: 'Desarrollador de aplicaciones web para automatizar procesos administrativos internos, por contratacion para empresa privada que brinda servicios de mantenimiento a infraestructuras publicas/estatales',
            empresa: 'Servicios & ingenieria de calidad SA',
            logoEmpresa: '',
            fecha: new Date(2022,10,1),
            fechaFin: new Date(Date.now())
        }
    ],
    findAll: function (){
        return this.data.sort((a,b) => (b.fecha - a.fecha))
    }
}