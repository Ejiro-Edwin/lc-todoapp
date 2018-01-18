import React from "react"
import {
    Grid, 
    Cell,
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
        submitting, 
        onSubmit,
        onUserAutocomplete,
    } = props;
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{margin: 0, width: "100%"}}
        className="md-text--theme-primary"
      >
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
              name="assign_to"
              label="Atribuir para"
              component={renderAutocomplete}
              data={users}
              dataValue="id"
              onAutocomplete={onUserAutocomplete}
          />
          </Cell>
          <Cell size={12}>
            <Field
              name="deadline"
              label="Concluir até"
              component={renderDatePicker}
              portal={true}
              lastChild={true}
              icon={null}
              disableScrollLocking={true}
              renderNode={document.body}
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
