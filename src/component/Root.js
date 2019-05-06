import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';

import { Brand } from './Brand';
import { AddNewTodo } from './AddNewTodo';
import { Todos } from './Todos';
import User from './User/User';
import { AuthService } from '../services/Auth';

export class Root extends React.Component {
    auth;
    constructor(props) {
        super(props);
        this.auth = new AuthService();
        this.state = {
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
    }
    toggleCompleted = (id) => {
        this.setState({
            todos: this.state.todos.map(item => {
                if (item.id === id) {
                    item.completed = !item.completed
                }
                return item;
            })
        })
    }
    deleteItem = (id) => {
        this.setState({
            todos: [...this.state.todos.filter(item => item.id !== id)]
        })
    }
    editTodo = (todoItem) => {
        console.log(todoItem);
        this.setState({
            editTodoItem: { ...todoItem }
        }, () => {
            console.log(this.state.editTodoItem);
        });
    }
    saveEditingItem = (item) => {
        const temp = this.state.todos;
        if (item.id === -1) {
            const newId = temp.length;
            temp.push({ id: newId, title: item.title, completed: false });
            this.setState({
                todos: [...temp]
            })
        }
        else {
            temp.forEach(it => {
                if (it.id === item.id) {
                    it.title = item.title;
                    it.completed = item.completed;
                    console.log(item, temp);
                    this.setState({
                        todos: [...temp],
                        editTodoItem: {
                            id: -1,
                            title: '',
                            completed: false
                        }
                    }, () => {
                        console.log(this.state.todos);
                    });
                }
            })
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            todos: { ...newProps.todos }
        })
    }
    render() {
        return (
            <div className="App">
                <User userData={this.auth.getUserData()}/>
                <Brand />
                <AddNewTodo
                    editItem={this.state.editTodoItem}
                    saveEditingItem={this.saveEditingItem} />
                <Todos todos={this.state.todos}
                    editTodo={this.editTodo}
                    toggleCompleted={this.toggleCompleted}
                    deleteItem={this.deleteItem} />
                {this.props.children}
            </div>
        );
    }
}
Root.propTypes = {
    todos: PropTypes.array,
    editTodoItem: PropTypes.object
}