import API from '@/services/Api'

export default {
    getTodos(){
        return API().get('todo')
    },

    addTodo(todo){
        return API().post('addTodo',{
            todo: todo
        })
    }
}