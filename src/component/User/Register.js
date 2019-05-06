import React from 'react';
import { AuthService } from '../../services/Auth';

export class Register extends React.Component{
    authService;
    constructor(){
        super();
        document.title = "Login";
        this.state = {
            userName: '',
            password: '',
            confirmPassword: '',
            errors: ''
        }
        this.authService = new AuthService();
    }
    componentWillMount(){
        if(this.authService.getLoginStatus()){
            this.props.history.push('/');
        }
    }
    onFormValueChange = (event) =>{
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    register = (event)=>{
        event.preventDefault();
        this.setState({
            errors: ""
        })
        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                errors: "Please re-enter the password"
            });
            return;
        }
        console.log(this.state);
        this.authService.register({...this.state})
        .then((res)=>{
            console.log(res, this.props);
            if(res.status === 1){
                this.props.history.push('/')
            }
            else{
                this.setState({
                    errors: res.msg
                })
            }
        })
    }
    render(){
        return (
            <div className="card" style={{ maxWidth: '500px', margin: '10vh auto' }}>
                <div className="card-body">
                    <h2>Please Login to continue</h2>
                    <form onSubmit={this.register}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" 
                                name="userName" required
                                onChange={this.onFormValueChange}
                                value={this.state.userName}
                                autoComplete={'none'}
                                placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" 
                                name="password" required
                                minLength={6}
                                onChange={this.onFormValueChange}
                                value={this.state.password}
                                autoComplete={'none'}
                                placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" 
                                name="confirmPassword" required
                                minLength={6}
                                onChange={this.onFormValueChange}
                                value={this.state.confirmPassword}
                                autoComplete={'none'}
                                placeholder="Confirm Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {(this.state.errors !== '')?(<p className="text-danger">{this.state.errors}</p>):''}
                </div>
            </div>
        )
    }
}