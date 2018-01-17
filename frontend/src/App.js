import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import initialState from './reducers/initialState';
import configureStore from './store';
import PrivateRoute from './containers/PrivateRoute';
import AppBarContainer from './containers/AppBarContainer';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import AuthRoute from './containers/AuthRoute';
import NotificationsContainer from './containers/NotificationsContainer';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordDone from './pages/ForgotPasswordDone';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <Route
        render={({ location, match }) => (
          <AppBarContainer location={location} match={match}>
              <Switch key={location.key}>
                  <AuthRoute exact path="/auth/login" component={Login} />
                  <AuthRoute exact path="/auth/forgot-password" component={ForgotPassword} />
                  <AuthRoute exact path="/auth/forgot-password-done" component={ForgotPasswordDone} />
                  <AuthRoute exact path="/auth/login" component={Login} />
                  <PrivateRoute exact path="/" location={location} match={match} component={Home} />
                  <PrivateRoute path="/todo/:id" location={location} match={match} component={Tasks} />
                  <NotificationsContainer />
              </Switch>
          </AppBarContainer>
        )}
      />
    );
  }
}

export default App;
