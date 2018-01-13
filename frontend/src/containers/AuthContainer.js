import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Auth from '../pages/Auth'
import {login} from  '../actions/auth'
import FullWidthSection from '../components/FullWidthSection';
import { Card, CardTitle } from 'react-md';
import NotificationsContainer from './NotificationsContainer';
import logo from "../images/todo-app-icon.png";
import CardText from 'react-md/lib/Cards/CardText';

const styles = {
  section: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 400,
    margin: '0  auto',
    selfAlign: 'center'
  },
  logo:{
    textAlign: 'center',
    padding: '1rem'
  }
}

const AuthContainer = (props) => {
  return (
    props.isAuthenticated && localStorage.getItem('lctodo_token')? 
      <Redirect to='/' />
      :
      <div className="auth-page">
        <FullWidthSection style={styles.section}>
            <div style={styles.card}>
              <div style={styles.logo}>
                <img width={90} src={logo} />
              </div>
                <Auth  {...props} />
                <NotificationsContainer />
            </div>
        </FullWidthSection>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errors: state.notifications,
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (email, password) => {
    dispatch(login(email, password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);