import { EventoNotFound } from '../exceptions/Evento.js';
import Evento from '../models/Evento.js';
import db from '../data/dataSource.js'

export default {
    findAll: function() {
        const stmt = db.prepare(`select * from eventos`)
        let Eventos =[]
        while(stmt.step()) Eventos.push(new Evento(...stmt.get()));
        stmt.free()
        return Eventos
    },
    findOne: function(id) {
        const stmt = db.prepare(`select * from eventos where id = ${id}`)
        let evento = {}
        if(stmt.step()) evento = new Evento(...stmt.get())
        else throw new EventoNotFound(`Evento id: ${id} not found`)
        stmt.free()
        return evento
    }
}