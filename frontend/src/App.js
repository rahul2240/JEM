import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Event from './Component/Event';
import Create from './Component/Create';
import Error from './Component/Error';
import Dashboard from './Component/Dashboard';
import Username from './Component/Username';
import LoginForm from './Component/LoginForm';
import Past from './Component/Past';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <Switch>
          <Route path='/' component={ Event } exact></Route>
          <Route path='/past' component={ Past } exact></Route>
          <Route path='/login' component={ LoginForm } exact></Route>
          <Route path='/Create' component={ Create } ></Route>
          <Route path='/dashboard' component={ Dashboard } ></Route>
          <Route path='/username' component={ Username } ></Route>
          <Route component={Error}></Route>
        </Switch>
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
