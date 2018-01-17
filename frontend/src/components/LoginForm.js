import React, {Component} from "react"
import {
    Grid, 
    Cell,
    CardText,
    Button
} from "react-md";
import {
  renderTextField,
  renderAutocomplete,
  renderDatePicker,
} from "../utils/ReactMDRedux.js"
import { Field, reduxForm } from 'redux-form';
import { required, email } from "../utils/validations"


const LoginForm = ({ ...props }) => {
    const {
        handleSubmit, 
        submitting, 
        valid, 
        onSubmit,
        errors
    } = props;
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{margin: 0, width: "100%"}}
        className="md-text--theme-primary"
      >
        {!valid && (
          <p className="md-body-1 md-text-field-message-container--error">
            {errors}
          </p>
        )}
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
          <Button
            type="submit"
            primary
            flat
            disabled={submitting}
            className="md-full-width"

          >
            Entrar
          </Button>
        </Grid>
      </form>
    )
}


export default reduxForm({
  form: "loginForm",
})(LoginForm)