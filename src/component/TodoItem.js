import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({todo, toggleCompleted, editTodo, deleteItem}) => {
    return (
        <li className="list-group-item">
            <div>
                <input type="checkbox" onChange={toggleCompleted.bind(this, todo.id)}/>
                <span className="ml-3 todoItemText" 
                    style={{textDecoration: todo.completed?'line-through':'none'}} 
                    onClick={editTodo.bind(this, todo)}>{todo.title}</span>
            </div>
            <button className="btn btn-danger" onClick={deleteItem.bind(this, todo.id)}>&times;</button>
        </li>
    );
}
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
}
export default TodoItem;