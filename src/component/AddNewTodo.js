import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AddNewTodo extends React.Component{
    handleValueChange = (event) => {
        const value = event.target.value;
        this.props.handleValueChange(value);
    }
    saveTodo = (event) =>{
        event.preventDefault()
        this.saveEditingItem(this.props.initialEditTodo);
    }
    resetForm = () =>{
        this.setState({
            initialEditTodo: {...this.props.editItem}
        })
    }
    saveEditingItem = (item) => {
        console.log(item);
        if (item.id === -1) {
            this.props.addTodo(item);
        }
        else {
            this.props.updateTodo(item);
        }
    }
    render(){
        return (
            <form className="input-group mb-3" onSubmit={this.saveTodo} onReset={this.resetForm}>
                {
                    (this.props.initialEditTodo.title.length > 0)?
                    <div className="input-group-prepend">
                        <button className="btn btn-danger" type="reset">Cancel</button>
                    </div>:''
                }
                <input type="hidden" value={this.props.initialEditTodo.id}/>
                <input type="text" className="form-control" name="editItem" placeholder="Add new" 
                    value={ this.props.initialEditTodo.title } onChange={this.handleValueChange}/>
                <div className="input-group-append">
                    <button 
                        className={'btn btn-primary'+(this.props.initialEditTodo.title.length < 1?' disabled':'')} 
                        type="submit" style={{pointerEvents: this.props.initialEditTodo.title.length < 1?'none':'all'}}
                        disabled={this.props.initialEditTodo.length < 1}>Save</button>
                </div>
            </form>
        );
    }
}
AddNewTodo.propTypes = {
    editItem: PropTypes.object
}
const mapStateToProps = (state)=>{
    return {
        initialEditTodo: state.initialEditTodo
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        addTodo: (newTodo)=>{
            dispatch({type: 'ADD_TODO', todo: newTodo})
        },
        handleValueChange: (value)=>{
            dispatch({type: 'HANDLE_VALUE_CHANGE', title: value})
        },
        updateTodo: (updatedTodo)=>{
            dispatch({type: 'UPDATE_TODO', todo: updatedTodo})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewTodo);