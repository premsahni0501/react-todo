import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

export class Todos extends React.Component{
    state = {
        userId: this.props.userId,
        userData: null
    }
    render(){
        return (
            <ul className="list-group">
                {
                    this.props.todos.map(item=>
                        <TodoItem key={item.id} todo={item} 
                            deleteItem={this.props.deleteItem}
                            editTodo={this.props.editTodo}
                            toggleCompleted={this.props.toggleCompleted}/>
                    )
                }
            </ul>
        );
    }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    deleteItem: PropTypes.func,
    editTodo: PropTypes.func,
    toggleCompleted: PropTypes.func
}