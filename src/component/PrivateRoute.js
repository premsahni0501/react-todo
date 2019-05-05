import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthService} from '../services/Auth';

export const PrivateRoute = ({component: Component, ...rest })=>{
    const authService = new AuthService();
    return (
        <Route { ...rest} 
            render={(props)=>authService.getLoginStatus()
            ?<Component {...props} userId={authService.getUserId()}/>
            :<Redirect to={'/login'}/>}
        />)
}