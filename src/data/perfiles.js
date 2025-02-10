export default {
    data: [
        { id: 1, nombre: 'Frontend developer' },
        { id: 2, nombre: 'Backend developer' },
        { id: 3, nombre: 'DevOps' },
        { id: 4, nombre: 'QA' },
        { id: 5, nombre: 'Data Analitycs' },
        { id: 6, nombre: 'Blockchain developer' },
        { id: 7, nombre: 'Full Stack Developer' },
    ],
    findAll: function (){
        return this.data
    },
    findOne: function (id){
        return this.data.find(perf => perf.id == id)
    }
}