import React from 'react';
import {connect} from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated? 
      <Component {...props} />
        : <Redirect
          to={{
            pathname: '/auth/login',
            state: { from: props.location }
          }} />
    )} />
);



const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})


export default withRouter(connect(mapStateToProps)(PrivateRoute));