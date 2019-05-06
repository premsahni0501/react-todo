import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TodoItem extends React.Component{
    todoIndex = this.props.index;
    getStyle = ()=>{
        console.log(this.props.todo);
        return {
            textDecoration: this.props.todo.completed?'line-through':'none'
        }
    }
    editTodo = (todo) =>{
        this.props.setEditTodoItem(todo);
    }
    deleteItem = (id) => {
        this.props.deleteTodo(id);
    }
    toggleCompleted = (id) => {
        this.props.toggleCompleted(id);
    }
    render(){
        return (
            <li className="list-group-item">
                <div>
                    <input type="checkbox" onChange={this.toggleCompleted.bind(this, this.props.todo.id)}/>
                    <span className="ml-3 todoItemText" style={this.getStyle()} onClick={this.editTodo.bind(this, this.props.todo)}>{this.props.todo.title}</span>
                </div>
                <button className="btn btn-danger" onClick={this.deleteItem.bind(this, this.props.todo.id)}>&times;</button>
            </li>
        );
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>{
    return {}
}
const mapDispatchToProps = (dispatch) =>{
    return {
        setEditTodoItem: (editingTodo)=>{
            dispatch({type: 'SET_EDITING_TODO', todo: editingTodo})
        },
        deleteTodo: (id)=>{
            dispatch({type: 'DELETE_TODO', id: id})
        },
        toggleCompleted: (id)=>{
            dispatch({type: 'TOGGLE_COMPLETE_TODO', id: id})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)