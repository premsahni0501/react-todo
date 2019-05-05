import React from 'react';
import PropTypes from 'prop-types';

export class AddNewTodo extends React.Component{
    constructor(props){
        super();
        this.state = {
            initialEditTodo: {...props.editItem}
        }
    }
    componentWillReceiveProps(newProps){
        this.setState({
            initialEditTodo: {...newProps.editItem}
        })
    }
    handleValueChange = (event) => {
        const value = event.target.value;
        let {id, title, completed} = this.state.initialEditTodo;
        title = value;
        this.setState({
            initialEditTodo: {id, title, completed}
        })
    }
    saveTodo = (event) =>{
        event.preventDefault()
        this.props.saveEditingItem(this.state.initialEditTodo);
        this.setState({
            initialEditTodo: {...this.props.editItem}
        })
    }
    resetForm = () =>{
        this.setState({
            initialEditTodo: {...this.props.editItem}
        })
    }
    render(){
        return (
            <form className="input-group mb-3" onSubmit={this.saveTodo} onReset={this.resetForm}>
                {
                    (this.state.initialEditTodo.title.length > 0)?
                    <div className="input-group-prepend">
                        <button className="btn btn-danger" type="reset">Cancel</button>
                    </div>:''
                }
                <input type="hidden" value={this.state.initialEditTodo.id}/>
                <input type="text" className="form-control" name="editItem" placeholder="Add new" 
                    value={ this.state.initialEditTodo.title } onChange={this.handleValueChange}/>
                <div className="input-group-append">
                    <button 
                        className={'btn btn-primary'+(this.state.initialEditTodo.title.length < 1?' disabled':'')} 
                        type="submit" style={{pointerEvents: this.state.initialEditTodo.title.length < 1?'none':'all'}}
                        disabled={this.state.initialEditTodo.length < 1}>Save</button>
                </div>
            </form>
        );
    }
}
AddNewTodo.propTypes = {
    editItem: PropTypes.object,
    saveEditingItem: PropTypes.func
}