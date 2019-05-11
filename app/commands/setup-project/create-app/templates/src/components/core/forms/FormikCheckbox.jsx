import React, { Component } from 'react'
import Flex from 'flexbox-react'
import Checkbox from '@material-ui/core/Checkbox'
/*

  <FormikCheckbox
    id="ID_HERE"
    label="LABEL_HERE"
    formikProps={props}
  />

*/
export function FormikCheckbox (props) {
  const { id, label } = props
  const { values, setFieldValue } = props.formikProps

  const handleChange = event => {
    setFieldValue(id, event.target.checked)
  }

  return (
    <Flex alignItems="center">
      <Flex>
        <Checkbox
          checked={values[id]}
          onChange={handleChange}
          inputProps={{
            "aria-label": label
          }}
        />
      </Flex>
      <Flex>{label}</Flex>
    </Flex>
  )
}
