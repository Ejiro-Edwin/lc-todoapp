import React from "react"
import {
    Grid, 
    Cell,
    Button
} from "react-md";
import {
  renderTextField,
} from "../utils/ReactMDRedux.js"
import {Field, reduxForm} from "redux-form"
import { required } from "../utils/validations"
import { confirmation } from "redux-form-validators"


const RecoverPasswordForm = ({ ...props }) => {
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
      <Grid >
        <Cell size={12} className="md-text-center">
              <h3>Criar nova senha</h3>
          </Cell>
          <Cell size={12}>
            <Field
              name="password"
              label="Senha"
              type="password"
              validate={[required]}
              required
              component={renderTextField}
            />
          </Cell>
          <Cell size={12}>
            <Field
              name="passwordConfirmation"
              label="Confirme a senha"
              type="password"
              validate={
                [required, 
                confirmation({ field: "password", fieldLabel: "Password", message: 'As senhas não são iguais' })]}
              required
              component={renderTextField}
            />
          </Cell>
          <Cell size={12}>
            <Button
              type="submit"
              primary
              flat
              disabled={submitting}
              className="md-full-width md-text-center"

            >
              Criar senha
            </Button>
          </Cell>
        </Grid>
      </form>
    )
}

export default reduxForm({
  form: "RecoverPasswordForm",
})(RecoverPasswordForm)
