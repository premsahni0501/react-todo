import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';

import { Brand } from './Brand';
import AddNewTodo from './AddNewTodo';
import Todos from './Todos';
import User from './User/User';
import { AuthService } from '../services/Auth';

class Root extends React.Component {
    auth;
    constructor(props) {
        super(props);
        this.auth = new AuthService();
    }
    render() {
        return (
            <div className="App">
                <User userData={this.auth.getUserData()}/>
                <Brand />
                <AddNewTodo />
                <Todos/>
            </div>
        );
    }
}
Root.propTypes = {
    todos: PropTypes.array
}
export default Root;