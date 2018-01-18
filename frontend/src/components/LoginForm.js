import React from "react"
import {
    Grid, 
    Cell,
    Button
} from "react-md";
import { renderTextField } from "../utils/ReactMDRedux.js"
import { Field, reduxForm } from 'redux-form';
import { required, email } from "../utils/validations"
import { Link } from "react-router-dom";


const LoginForm = ({ ...props }) => {
    const {
        handleSubmit, 
        submitting, 
        onSubmit
    } = props;
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{margin: 0, width: "100%"}}
        className="md-text--theme-primary"
      >
        <Grid>
          <Cell size={12}>
            <Field
              name="email"
              label="Email"
              validate={[required, email]}
              component={renderTextField}
            />
          </Cell>
          <Cell size={12}>
            <Field
                name="password"
                label="Senha"
                type="password"
                validate={[required]}
                component={renderTextField}
              />
          </Cell>
          <Cell size={12} className="md-text-center">
            <Link to="/auth/forgot-password" style={{color: '#636363'}}>Esqueceu a senha?</Link>
          </Cell>
          <Cell size={12} className="md-text-center">
            <Link to="/auth/signup" style={{color: '#636363'}}>Não tem uma conta?</Link>
          </Cell>
          <Cell size={12}>
            <Button
              type="submit"
              primary
              flat
              disabled={submitting}
              className="md-full-width"

            >
              Entrar
            </Button>
          </Cell>
        </Grid>
      </form>
    )
}


export default reduxForm({
  form: "loginForm",
})(LoginForm)