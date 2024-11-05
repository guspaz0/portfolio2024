import vars from '../utils/var.js'

export default {
    data: [
        {
            id: 1,
            nombre: 'Tecnico en reparacion de PC',
            descripcion: 'Soporte, reparacion y mantenimiento de equipos informaticos y moviles para una empresa dedicada a la venta y distribucion de productos alimenticios.',
            empresa: 'GyA Distribuciones SRL',
            imagen: '',
            fecha: new Date(2010,10,1),
            fechaFin: new Date(2019,10,1)
        },
        {
            id: 2,
            nombre: 'Pasante Tecnico universitario en redes de computadoras',
            descripcion: 'Diseño, cableado e instalacion de infraestructura de equipos de redes informaticas para una reconocida Obra Social provincial. configuracion de switches/routers de capa 3 y 7',
            empresa: 'Instituto de Obra Social del Empleado Provincial (IOSEP)',
            imagen: 'logoIOSEP_y2uo3m.png',
            fecha: new Date(2010,8,1),
            fechaFin: new Date(2010,10,30)
        },
        {
            id: 3,
            nombre: 'Desarrollador Full stack',
            descripcion: 'Desarrollador de aplicaciones web para automatizar procesos administrativos internos, por contratacion para empresa privada que brinda servicios de mantenimiento a infraestructuras publicas/estatales del sector de salud',
            empresa: 'Servicios & ingenieria de calidad SA',
            imagen: 'SIC-SA-logo_mgvtx1.png',
            fecha: new Date(2022,10,1),
            fechaFin: new Date(2024,9,31)
        },
        {
            id: 4,
            nombre: 'Desarrollador Full stack Freelancer',
            descripcion: '',
            empresa: 'Freelancer',
            imagen: '',
            fecha: new Date(2024,10,1),
            fechaFin: new Date(Date.now())
        }
    ],
    findAll: function (){
        return this.data.map((exp) => { 
            let meses = ((exp.fechaFin-exp.fecha)/(1000*60*60*24*30))
            let años = meses >= 12?  Math.floor(meses/12) : 0
            return {...exp, 
                imagen: exp.imagen? vars.expurl+exp.imagen : '',
                tiempo: {
                    años, 
                    meses: Math.floor(meses-años*12)
                }
            }
        }).sort((a,b) => (b.fecha - a.fecha))
    }
}