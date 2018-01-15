import React from 'react';
import {connect} from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated? (
      <Component {...props} />
      )  : <Redirect
          to={{
            pathname: '/auth',
            state: { from: props.location }
          }} />
    )} />
);



const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, null, null, {
  pure: false,
})(PrivateRoute);