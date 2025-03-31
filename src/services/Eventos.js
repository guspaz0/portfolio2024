import eventos from '../data/eventos.js'
import { EventoNotFound } from '../exceptions/Evento.js';
import Evento from '../models/Evento.js';

export default {
    findAll: function() {
        return eventos.map(evento => new Evento(...evento));
    },
    findOne: function(id) {
        const evento = new Evento(...eventos.find(([evId]) => evId === +id))
        if(evento) return evento
        else throw new EventoNotFound(`Evento id: ${id} not found`)
    }
}