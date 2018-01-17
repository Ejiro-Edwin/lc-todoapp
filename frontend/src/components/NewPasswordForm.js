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


const NewPasswordForm = ({ ...props }) => {
    const {
        handleSubmit, 
        submitting, 
        valid, 
        newPasswordSubmit,
        errors
    } = props;
    return (
      <form
        onSubmit={handleSubmit(newPasswordSubmit)}
        style={{margin: 0, width: "100%"}}
        className="md-text--theme-primary"
      >
        {!valid && (
          <p className="md-body-1 md-text-field-message-container--error">
            {errors}
          </p>
        )}
        <Grid noSpacing>
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
            raised
            secondary
            disabled={submitting}
          >
            Adicionar
          </Button>
        </Grid>
      </form>
    )
}

export default reduxForm({
  form: "NewPasswordForm",
})(NewPasswordForm)
