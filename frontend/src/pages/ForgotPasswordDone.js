import React, { Component } from 'react';
import { Grid, Cell} from 'react-md';

class ForgotPasswordDone extends Component {
  
  render() {
    const { props } = this;
    return (
      <Grid>
        <Cell size={12}>
            <h3>Pronto</h3>
        </Cell>
        <Cell size={12}>
            <p>Enviamos um email com todas as intruções para que você recupere sua senha</p>
        </Cell>
      </Grid>
    );
  }
}


export default ForgotPasswordDone;


