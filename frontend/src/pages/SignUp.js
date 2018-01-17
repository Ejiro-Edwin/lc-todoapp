import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';
import { signup } from '../actions/auth';
import { connect } from 'react-redux';
class SignUp extends Component {

  constructor (props) {
    super(props)
    this.state = {
      image: null
    }  
  }
  

  render() {
    const { props } = this;
    return (
      <SignUpForm {...props} onSubmit={this.props.signup} setFile={this.setFile} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup: (parameters) => { 
    dispatch(signup(parameters))}
})

export default connect(
  null,
  mapDispatchToProps
)(SignUp);


