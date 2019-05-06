const initialState = {
    initialEditTodo: {
        id: -1,
        title: '',
        completed: false
    },
    editTodoItem: {
        id: -1,
        title: '',
        completed: false
    },
    todos: [
        {
            id: 0,
            title: 'Task one',
            completed: false
        },
        {
            id: 1,
            title: 'Task Two',
            completed: false
        },
        {
            id: 2,
            title: 'Task three',
            completed: false
        }
    ]
}
const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'DELETE_TODO': 
            const leftTodos = [...state.todos.filter(item => item.id !== action.id)];
            return {
                ...state,
                todos: leftTodos
            }
        case 'ADD_TODO': 
            const newId = state.todos.length;
            let newTodoToAdd = action.todo;
            newTodoToAdd.id = newId;
            const newTodos = [...state.todos, newTodoToAdd];
            return {
                ...state,
                todos: newTodos,
                initialEditTodo: {...state.editTodoItem},
            }
        case 'UPDATE_TODO': 
            const updatedTodoItem = action.todo;
            let updatedTodos = [];
            updatedTodos = state.todos.map(it => {
                if (it.id === updatedTodoItem.id) {
                    it.title = updatedTodoItem.title;
                    it.completed = updatedTodoItem.completed;
                }
                return it;
            })
            return {
                ...state,
                initialEditTodo: {...state.editTodoItem},
                todos: [...updatedTodos]
            }
        case 'SET_EDITING_TODO': 
            const editingTodo = action.todo;
            console.log(editingTodo);
            return {
                ...state,
                initialEditTodo: editingTodo
            }
        case 'HANDLE_VALUE_CHANGE': 
            let {id, title, completed} = state.initialEditTodo;
            title = action.title;
            return {
                ...state,
                initialEditTodo: { id, title, completed}
            }
        case 'TOGGLE_COMPLETE_TODO':
            const toggleTodoId = action.id;
            let completedTodos = [];
            completedTodos = state.todos.filter(item => {
                if (item.id === toggleTodoId) {
                    item.completed = !item.completed
                }
                return item;
            })
            console.log(completedTodos);
            return{
                ...state,
                todos: [...completedTodos]
            }
        default: console.log(action);
    }
    return state;
}
export default rootReducer;