import eventos from '../data/eventos.js'
import Evento from '../models/Evento.js';

export default {
    findAll: function() {
        return eventos.map(([id,titulo,descripcion,fecha,imagen]) => new Evento(id,titulo,descripcion,fecha,imagen));
    },
    findOne: function(id) {
        return this.findAll().find(ev => ev.id === +id);
    }
}