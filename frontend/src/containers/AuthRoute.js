import React from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'react-md';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import FullWidthSection from '../components/FullWidthSection';
import logo from "../images/todo-app-icon.png";

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


const AuthRoute = ({ component: Component, isAuthenticated, location, ...rest }) => {
  const { from } = location.state || { from: { pathname: '/' } }
  return (
    <Route {...rest} render={props => (
      !isAuthenticated? 
      <FullWidthSection style={styles.section}>
        <div style={styles.card}>
          <div style={styles.logo}>
            <img width={80} src={logo} />
          </div>
          <Component {...props} />
        </div>
        </FullWidthSection>
          : <Redirect
              to={from} />  
      )} />
  )
}



const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})


export default withRouter(connect(mapStateToProps)(AuthRoute));
