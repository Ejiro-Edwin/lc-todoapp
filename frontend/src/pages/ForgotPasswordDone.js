import React, { Component } from 'react';
import { Grid, Cell, Button} from 'react-md';
import { Link } from 'react-router-dom';

class ForgotPasswordDone extends Component {
  
  render() {
    return (
      <Grid>
        <Cell size={12} className="md-text-center">
            <h3>Pronto</h3>
        </Cell>
        <Cell size={12}>
            <p>Enviamos um email com todas as intruções para que você recupere sua senha</p>
        </Cell>
        <Button
              primary
              flat
              className="md-full-width md-text-center"
              component={Link}
              to="/auth/login"
            >
              Voltar para tela inicial
            </Button>
      </Grid>
    );
  }
}


export default ForgotPasswordDone;


