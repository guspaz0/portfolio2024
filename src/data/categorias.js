export default {
    data: [
        { id: 1, nombre: 'Hard Skill' },
        { id: 2, nombre: 'Soft Skill' }
    ],
    findAll(){
        return this.data
    },
    findOne(id){
        return this.data.find(cat => cat.id == id)
    }
}