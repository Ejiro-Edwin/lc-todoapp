import React, {Component} from "react"
import {
    Grid, 
    Cell,
    CardText,
    Button
} from "react-md";
import {
  renderTextField
} from "../utils/ReactMDRedux.js"
import {Field, reduxForm} from "redux-form"
import {required} from "../utils/validations"


const NewTodoForm = ({ ...props }) => {
    const {
        handleSubmit, 
        pristine, 
        submitting, 
        valid, 
        onSubmit,
        onUserAutocomplete,
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
        <Grid noSpacing>
          <Cell size={12}>
            <Field
              name="title"
              label="Título"
              validate={[required]}
              required
              component={renderTextField}
            />
          </Cell>
          <Button
            type="submit"
            raised
            secondary
            style={{marginTop: '1rem'}}
            disabled={submitting}
          >
            Salvar
          </Button>
        </Grid>
      </form>
    )
}

export default reduxForm({
  form: "NewTodoForm",
  enableReinitialize : true
})(NewTodoForm)
