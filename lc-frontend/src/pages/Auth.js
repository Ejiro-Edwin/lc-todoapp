import React, { Component } from 'react';
import { Card } from 'react-md';
import '../css/home.css';
import logo from '../images/logo.svg';

export default class Auth extends Component {
  render() {
    return (
      <Card>
        <div className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="home-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </Card>
    );
  }
}
