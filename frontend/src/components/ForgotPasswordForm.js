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
import {Field, reduxForm} from "redux-form"
import { required, email } from "../utils/validations"


const ForgotPasswordForm = ({ ...props }) => {
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
        <Grid>
          <Cell size={12}>
              <h3>Restaurar senha</h3>
          </Cell>
          <Cell size={12}>
              <p>Digite seu email no campo abaixo e te enviaremos um e-mail com instuções para restaurar sua senha</p>
          </Cell>
          <Cell size={12}>
            <Field
              name="email"
              label="Email"
              validate={[required, email]}
              required
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
            ENVIAR
          </Button>
        </Grid>
      </form>
    )
}

export default reduxForm({
  form: "ForgotPasswordForm",
})(ForgotPasswordForm)
