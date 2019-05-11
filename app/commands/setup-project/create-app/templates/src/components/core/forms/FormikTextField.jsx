import React, { Component } from 'react'
import Flex from 'flexbox-react'
import TextField from '@material-ui/core/TextField'
import { getErrors, hasErrors } from './forms'
import { ErrorMessage } from './ErrorMessage'
/*
  <FormikTextField
    id="ID_HERE"
    label="LABEL_HERE"
    formikProps={props}
  />
*/
export function FormikTextField (props) {
  const { id, type, label, helperText, rows } = props
  const { values, errors, touched, handleChange, handleBlur } = props.formikProps
  const multiline = rows !== undefined
  const rowsMax = rows !== null ? rows : 1
  const getInputLabelProps = () => {
    const { type } = props

    if (type !== 'date') {
      return null
    }

    return {
      shrink: true
    }
  }

  return (
    <Flex flexDirection="column" flexGrow={1} margin="0 10px">
      <TextField
        id={id}
        label={label}
        margin="normal"
        value={values[id]}
        error={hasErrors(id, errors, touched)}
        onChange={handleChange}
        onBlur={handleBlur}
        type={ type || 'text' }
        fullWidth
        variant="outlined"
        InputLabelProps={getInputLabelProps()}
        helperText={helperText}
        multiline={multiline}
        rowsMax={rowsMax}
      />
      <Flex marginLeft="10px">
        <ErrorMessage text={getErrors(id, errors, touched)} />
      </Flex>
    </Flex>
  )
}
