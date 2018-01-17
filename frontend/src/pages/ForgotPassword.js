import React, { Component } from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { forgotPassword } from '../actions/auth';
import { connect } from 'react-redux';

class ForgotPassword extends Component {
  
  render() {
    const { props } = this;
    return (
      <ForgotPasswordForm {...props} onSubmit={this.props.onSubmit} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (parameters) => 
    dispatch(forgotPassword(parameters))
})

export default connect(
  null,
  mapDispatchToProps
)(ForgotPassword);


