export default {
    data: [
        {id: 1, nombre: 'Soft Skills'},
        {id: 2, nombre: 'Hard Skills'},
        {id: 3, nombre: 'Languages'},
    ],
    findAll(){
        return this.data
    },
    findOne(id){
        return this.data.find(cat => cat.id == id)
    }
}