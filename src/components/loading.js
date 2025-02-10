export default {
    template: `
        <div className="loading">
            {{message}} <span>.</span><span>.</span><span>.</span>
        </div>
    `,
    props: {
        message: {type: String, required: false, default: 'Cargando'},
    },
    data(){
        return {

        }
    }
}