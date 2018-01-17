import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './containers/PrivateRoute';
import AppBarContainer from './containers/AppBarContainer';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import AuthRoute from './containers/AuthRoute';
import NotificationsContainer from './containers/NotificationsContainer';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordDone from './pages/ForgotPasswordDone';
import RecoverPassword from './pages/RecoverPassword';
import SignUp from './pages/SignUp';
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
                  <AuthRoute exact path="/auth/recover-password/:hash/:email" component={RecoverPassword} />
                  <AuthRoute exact path="/auth/signup" component={SignUp} />
                  <PrivateRoute exact path="/" location={location} match={match} component={Home} />
                  <PrivateRoute path="/todo/:id" location={location} match={match} component={Tasks} />
              </Switch>
              <NotificationsContainer />
          </AppBarContainer>
        )}
      />
    );
  }
}

export default App;
