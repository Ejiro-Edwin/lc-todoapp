import React, { Component } from 'react';
import RecoverPasswordForm from '../components/RecoverPasswordForm';
import { recoverPassword } from '../actions/auth';
import { connect } from 'react-redux';

class RecoverPassword extends Component {

  submitRecoverPassword = (parameters) => {
    const email = this.props.match.params.email;
    const hash = this.props.match.params.hash;
    this.props.recoverPassword({
        email: email, 
        hash: hash,
        password: parameters.password
    })
  }

  render() {
    const { props } = this;
    return (
      <RecoverPasswordForm {...props} onSubmit={this.submitRecoverPassword} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
   recoverPassword: (parameters) => 
    dispatch(recoverPassword(parameters))
})

export default connect(
  null,
  mapDispatchToProps
)(RecoverPassword);


