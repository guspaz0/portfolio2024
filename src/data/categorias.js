export default {
    data: [
        { id: 1, nombre: 'Frontend developer' },
        { id: 2, nombre: 'Backend developer' },
        { id: 3, nombre: 'DevOps: Developer Operations' },
        { id: 4, nombre: 'QA: quality assurance' },
        { id: 5, nombre: 'Data Analitycs' }
    ],
    findAll(){
        return this.data
    },
    findOne(id){
        return this.data.find(cat => cat.id == id)
    }
}