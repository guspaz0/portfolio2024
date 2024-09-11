import vars from "../utils/var.js"

export default {
    data: [
        {
            id: 1,
            titulo: 'Gala de graduacion',
            descripcion: 'Entrega de certificados de Full Stack de DigitalHouse. Con la presencia de las maximas autoridades estatales de mi provincia y del staff de DigitalHouse',
            fecha: '',
            imagen: 'eventos/Evento_DH_wriffw.jpg'
        }
    ],
    findAll(){
        return this.data.map(e => ({...e, imagen: vars.certurl+e.imagen}))
    }
}