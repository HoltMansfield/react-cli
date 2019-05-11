import React, { Component } from 'react'
import Flex from 'flexbox-react'
import { DatePicker } from 'material-ui-pickers'
import { getErrors, hasErrors } from './forms'
import { ErrorMessage } from './ErrorMessage'
/*

  <FormikDatePicker
    id="ID_HERE"
    label="LABEL_HERE"
    formikProps={props}
  />

  https://material-ui-pickers.firebaseapp.com/api/datepicker

*/
export function FormikDatePicker (props) {
  const { id, label, format } = props
  const { values, errors, touched, setFieldValue, setFieldTouched } = props.formikProps

  const handleChange = selectedDate => {
    setFieldValue(id, selectedDate)
  }

  const handleBlur = () => {
    setFieldTouched(id, true)
  }

  const getFormat = () => {
    if (format) {
      return format
    }
    return 'DD / MMM / YYYY'
  }

  return (
    <Flex margin="13px 10px 0px 10px" flexGrow={1} flexDirection="column">
      <Flex flexGrow={1}>
        <DatePicker
          id={id}
          label={label}
          value={values[id]}
          onChange={handleChange}
          onClose={handleBlur}
          format={getFormat()}
          variant="outlined"
          animateYearScrolling
          fullWidth
          error={hasErrors(id, errors, touched)}
        />
      </Flex>
      <Flex margin="10px">
        <ErrorMessage text={getErrors(id, errors, touched)} />
      </Flex>
    </Flex>
  )
}
