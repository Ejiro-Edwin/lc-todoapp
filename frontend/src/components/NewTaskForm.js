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
import {required} from "../utils/validations"


const NewTaskForm = ({ ...props }) => {
    const {
        users, 
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
              name="description"
              label="Descrição"
              validate={[required]}
              required
              component={renderTextField}
            />
          </Cell>
          <Cell size={12}>
            <Field
              name="deadline"
              label="Concluir até"
              validate={[required]}
              required
              component={renderDatePicker}
              portal={true}
              lastChild={true}
              icon={null}
              disableScrollLocking={true}
              renderNode={document.body}
            />
          </Cell>
          <Cell size={12}>
            <Field
              name="assign_to"
              label="Atribuir para"
              validate={[required]}
              required
              component={renderAutocomplete}
              data={users}
              onAutocomplete={onUserAutocomplete}
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
  form: "NewTaskForm",
})(NewTaskForm)
