import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoItem from './TodoItem';

class Todos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.userId,
            userData: null
        }
        console.log(this.state.userId);
    }
    componentWillReceiveProps(newProps){
        console.log(newProps);
        this.forceUpdate();
    }
    render(){
        return (
            <ul className="list-group">
                {
                    this.props.todos.length > 0?(
                        this.props.todos.map((item)=>
                            <TodoItem key={item.id} todo={item}/>
                        )
                    ):(
                        <li className="list-group-item">No todos yet.</li>
                    )
                }
            </ul>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        todos: state.todos
    }
}

Todos.propTypes = {
    todos: PropTypes.array
}

export default connect(mapStateToProps)(Todos)