import React from 'react';
import logo from '../assets/img/logo.svg';

export const Brand = () =>{
    return (
        <div>
            <h1 className="text-center">
                <img src={logo} alt="logo" className="img-fluid" style={{maxWidth: '6rem'}}/>
            </h1>
            <h1>Todo App</h1>
        </div>
    );
}