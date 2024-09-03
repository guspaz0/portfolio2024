import vars from '../utils/var.js'

export default {
    data: [
        { id: 1, nombre: 'Henry', path: 'henry_logo_bdd8ny.png'},
        { id: 2, nombre: 'DigitalHouse', path: 'dh_logo_umrtjw.svg'},
        { id: 3, nombre: 'Udemy', path: 'Udemy_logo_x9xzgg.png'},
        { id: 4, nombre: 'Platzi', path: 'platzi_logoo_y3yzdf.png'},
        { id: 5, nombre: 'Codigo Facilito', path: 'codigo_facilito_i3qn6f.png'},
        { id: 6, nombre: 'IBM Skills Builds', path: 'IBM-SkillsBuild-logo_gagtra.png'},
        { id: 7, nombre: 'Codo a codo', path: 'Logos_BA_Agencia_fptgdh.jpg'}
    ],
    findAll: function (){
        return this.data.map((esc) => ({
            ...esc, 
            path: vars.escuelaurl+'/escuelas/'+esc.path
        }))
    },
    findOne: function(id) {
        const escuela = this.data.find((esc) => esc.id == id)
        if (escuela) {
            return {...escuela, path: vars.escuelaurl+escuela.path}
        } else throw new Error('No se encontró la escuela')
    }
}