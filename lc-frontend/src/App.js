import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from './components/NavLink';

import Home from './pages/Home';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

const navItems = [{
  exact: true,
  label: 'Home',
  to: '/',
  icon: 'home',
}, {
  label: 'Page 1',
  to: '/page-1',
  icon: 'history',
}, {
  label: 'Page 2',
  to: '/page-2',
  icon: 'settings',
}];

class App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <NavigationDrawer
            toolbarTitle="To Do App"
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            drawerZDepth={1}
            navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
          >
            <Switch key={location.key}>
              <Route exact path="/" location={location} component={Home} />
              <Route path="/page-1" location={location} component={Page1} />
              <Route path="/page-2" location={location} component={Page2} />
            </Switch>
          </NavigationDrawer>
        )}
      />
    );
  }
}

export default App;
