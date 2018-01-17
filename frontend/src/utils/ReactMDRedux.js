import React from "react"
import {
  TextField,
  SelectionControl,
  SelectionControlGroup,
  SelectField,
  Switch,
  Checkbox,
  Autocomplete,
  FileInput,
  DatePicker
} from "react-md/lib/"


export const renderTextField = ({
  input,
  type = "text",
  errorText,
  label,
  meta: {touched, error},
  ...custom
}) => {
  return (
    <TextField
      id={input.name}
      name={input.name}
      label={label}
      value={input.value}
      type={type}
      error={touched && (typeof error !== 'string'? error : error.length > 0)}
      errorText={errorText || (typeof error === 'string'? error : '')}
      onChange={input.onChange}
      {...custom}
    />
  )
}



export const renderAutocomplete = ({
  input,
  errorText,
  label,
  meta: {touched, error},
  ...custom
}) => {
  
  return (
    <Autocomplete
      id={input.id || input.name}
      label={label}
      name={input.name}
      onChange={input.onChange}
      onAutocomplete={value => input.onChange(value)}
      error={touched && error}
      errorText={errorText || error}
      placeholder={label}
      {...custom}
    />
  )
}

export const renderCheckBox = ({
  input,
  label,
  meta: {touched, error},
  ...custom
}) => (
  <Checkbox
    id={input.name}
    name={input.name}
    value={input.value}
    onChange={input.onChange}
    label={label}
    {...custom}
  />
)

export const renderDatePicker = ({
  input,
  errorText,
  label,
  meta: {touched, error},
  displayMode = "portrait",
  locales = "pt-BR",
  ...custom
}) => (
  <DatePicker
    id={input.name}
    label={label}
    onChange={input.onChange}
    autoOk
    error={touched && error}
    errorText={errorText || error}
    displayMode={displayMode}
    locales={locales}
    {...custom}
  />
)

export const renderSelectionControl = ({
  input,
  name,
  label,
  type,
  meta: {touched, error},
  ...custom
}) => (
  <SelectionControl
    id={input.id || input.name}
    name={input.name}
    label={label}
    type={type}
    onChange={input.onChange}
    {...custom}
  />
)

export const renderSelectionControlGroup = ({
  input,
  name,
  label,
  type,
  meta: {touched, error},
  ...custom
}) => (
  <SelectionControlGroup
    id={input.id || input.name}
    name={input.name}
    label={label}
    type={type}
    onChange={input.onChange}
    {...custom}
  />
)

export const renderSelectField = ({
  input,
  label,
  errorText,
  meta: {touched, error},
  ...custom
}) => (
  <SelectField
    id={input.name}
    label={label}
    name={input.name}
    value={input.value}
    onChange={input.onChange}
    error={touched && String(error).length > 0}
    errorText={errorText || error}
    {...custom}
  />
)

export const renderSwitch = ({
  input,
  label,
  meta: {touched, error},
  ...custom
}) => (
  <Switch
    id={input.name}
    name={input.name}
    label={label}
    onChange={input.onChange}
    {...custom}
  />
)

export const renderFileUploadField = ({
  input,
  label,
  errorText,
  meta: {touched, error},
  accept,
  ...custom
}) => (
  <div>
  <FileInput
    id={input.name}
    name={input.name}
    accept={accept}
    label={"Selecione um arquivo"}
    value={undefined}
    required
    onChange={input.onChange}
    {...custom}
  />
    {touched && error? 
    <div className="md-text-field-message-container md-text-field-message-container--right-icon-offset md-full-width md-text--error">
      <div aria-hidden="false" className="md-text-field-message md-text-field-message--active">
      {error}
      </div>
    </div>
     : null }
  </div>
)

