import React from "react"
import {
    Grid, 
    Cell,
    Button
} from "react-md";
import { renderTextField } from "../utils/ReactMDRedux.js"
import {Field, reduxForm} from "redux-form"
import {required} from "../utils/validations"


const NewTodoForm = ({ ...props }) => {
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
