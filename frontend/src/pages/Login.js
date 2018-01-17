import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import {reduxForm } from 'redux-form';
import { login } from '../actions/auth';
import { connect } from 'react-redux';

class Login extends Component {
  
  render() {
    const { props } = this;
    return (
      
      <LoginForm {...props} onSubmit={this.props.onSubmit} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (parameters) => {
    dispatch(login(parameters))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Login);


