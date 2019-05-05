import React, { Component } from 'react';
import { AuthService } from '../../services/Auth';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

export class User extends Component {
    auth;
    constructor(props){
        super(props);
        this.auth = new AuthService();
        this.state = { 
            userData: this.props.userData,
            dropdownToggle: false,
            loginStatus: this.auth.getLoginStatus()
        }
    }
    logout = ()=>{
        this.auth.logout();
        this.setState({
            userData: this.props.userData,
            dropdownToggle: false,
            loginStatus: this.auth.getLoginStatus()
        })
        window.location.href = "/login";
    }
    handleDropdown = () =>{
        if(this.state.loginStatus){
            this.setState({
                dropdownToggle: !this.state.dropdownToggle
            })
        }
    }
    render(){
        console.log(this.state.userData);
        return this.state.loginStatus?(
            <div className="dropdown userDropdown dropleft">
                <button className="btn btn-primary" type="button" 
                    onClick={this.handleDropdown}>
                    {this.state.userData.userName.substring(0, 1).toUpperCase()}
                </button>
                <div className={"dropdown-menu"+(this.state.dropdownToggle?' show':'')} >
                    <p className="dropdown-item" href="#">{this.state.userData.userName}</p>
                    <button className="dropdown-item" onClick={this.logout}>Log out</button>
                </div>
            </div>
        ):'';
    }
}
User.propType = {
    userData: PropTypes.object,
    loginStatus: PropTypes.bool,
    dropdownToggle: PropTypes.bool
}
withRouter(User)