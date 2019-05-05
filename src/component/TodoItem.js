import React from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component{
    getStyle = ()=>{
        return {
            textDecoration: this.props.todo.completed?'line-through':'none'
        }
    }
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }
    render(){
        return (
            <li className="list-group-item">
                <div>
                    <input type="checkbox" onChange={this.props.toggleCompleted.bind(this, this.props.todo.id)}/>
                    <span className="ml-3 todoItemText" style={this.getStyle()} onClick={this.props.editTodo.bind(this, this.props.todo)}>{this.props.todo.title}</span>
                </div>
                <button className="btn btn-danger" onClick={this.props.deleteItem.bind(this, this.props.todo.id)}>&times;</button>
            </li>
        );
    }
}
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
}