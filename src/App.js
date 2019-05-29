import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Root from './component/Root';
import { Login } from './component/User/Login';
import { PrivateRoute } from './component/PrivateRoute';
import { Register } from './component/User/Register';

export class App extends React.Component {
  render(){
    return (
      <BrowserRouter basename="/react-redux-todo">
        <Switch>
          <PrivateRoute exact path={'/'} component={Root} />
          <Route path={'/login'} component={Login}/>
          <Route path={'/register'} component={Register}/>
        </Switch>
      </BrowserRouter>
    );
  }
}