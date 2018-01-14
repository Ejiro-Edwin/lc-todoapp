import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import initialState from './reducers/initialState';
import configureStore from './store';
import PrivateRoute from './containers/PrivateRoute';
import AppBarContainer from './containers/AppBarContainer';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Page2 from './pages/Page2';
import Auth from './pages/Auth';
import AuthContainer from './containers/AuthContainer';
import NotificationsContainer from './containers/NotificationsContainer';
import store from './store';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <AppBarContainer location={location}>
              <Switch key={location.key}>
                  <Route exact path="/auth" location={location} component={AuthContainer} />
                  <PrivateRoute exact path="/" location={location} component={Home} />
                  <PrivateRoute path="/todo/:id" location={location} component={Tasks} />
                  <PrivateRoute path="/page-2" location={location} component={Page2} />
                  <NotificationsContainer />
              </Switch>
            </AppBarContainer>
        )}
      />
    );
  }
}

export default App;
