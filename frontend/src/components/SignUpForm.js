import React from "react"
import {
    Grid, 
    Cell,
    Button
} from "react-md";
import {
  renderTextField,
  renderFileUploadField
} from "../utils/ReactMDRedux.js"
import {Field, reduxForm, formValueSelector} from "redux-form"
import { required, email } from "../utils/validations"
import { confirmation, length } from "redux-form-validators"
import { connect } from "react-redux";


let SignUpForm = ({ ...props }) => {
    const {
        handleSubmit, 
        submitting, 
        onSubmit,
        imageValue
    } = props;

    
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{marginTop: '1rem', width: "100%"}}
        className="md-text--theme-primary"
      >
      <Grid >
        
        <Cell size={12} className="md-text-center">
              <h3>Criar uma conta</h3>
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
          <Cell size={6}>
            <Field
              name="first_name"
              label="Nome"
              validate={[required]}
              required
              component={renderTextField}
            />
          </Cell>
          <Cell size={6}>
            <Field
              name="last_name"
              label="Sobrenome"
              validate={[required]}
              required
              component={renderTextField}
            />
          </Cell>
          <Cell size={12}>
            <Field
              name="password"
              label="Senha"
              type="password"
              minLenght={6}
              validate={[required, length({ min: 6, max: 8, message: 'A senha deve ter entre 6 e 8 caracteres' })]}
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
                 length({ min: 6, max: 8, message: 'A senha deve ter entre 6 e 8 caracteres' }),
                confirmation({ field: "password", fieldLabel: "Password", message: 'As senhas não são iguais' })]}
              required
              component={renderTextField}
            />
          </Cell>
          <Cell size={12}>
            {imageValue? imageValue.name: ''}
            <Field
                name="image"
                label="Selecione uma Foto"
                className="md-full-width"
                required
                accept="image/*"
                component={renderFileUploadField}
                validate={[required]}
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
              Criar conta
            </Button>
          </Cell>
        </Grid>
      </form>
    )
}

SignUpForm = reduxForm({
  form: "signUpForm",
})(SignUpForm)

const selector = formValueSelector('signUpForm') // <-- same as form name
SignUpForm = connect(
  state => {
    // can select values individually
    const imageValue = selector(state, 'image')
    return { imageValue }
  }
)(SignUpForm)

export default SignUpForm;