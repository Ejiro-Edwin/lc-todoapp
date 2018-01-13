import React, { Component } from 'react';
import FullWidthSection from '../components/FullWidthSection';
import { Card, CardTitle,  TextField, Button } from 'react-md';
import '../css/home.css';
import logo from '../images/logo.svg';

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
  }
}
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  
  render() {
    const { children, onSubmit, errors } = this.props;
    const { email, password } = this.state;
    return (
      <div className="md-grid">
        <TextField
          id="floating-multiline"
          label="Email"
          type="email"
          required={true}
          placeholder="Digite seu email"
          errorText="Campo Obrigatório"
          className="md-cell md-cell--12 md-cell--bottom"
          onChange={(e) => this.setState({email: e})}
        />
        <TextField
          id="floating-password"
          label="Senha"
          required={true}
          placeholder="Digite sua senha"
          type="password"
          errorText="Campo Obrigatório"
          className="md-cell md-cell--12 md-cell--bottom"
          onChange={(e) => this.setState({password: e})}
        />
        <Button 
          flat 
          primary 
          style={{width: '100%', marginTop: '1rem'}}
          onClick={() => onSubmit(email, password)}>
            Entrar
        </Button>
      </div>
    );
  }
}
