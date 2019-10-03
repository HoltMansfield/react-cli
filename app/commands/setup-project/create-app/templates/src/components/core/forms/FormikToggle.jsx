import React from 'react'
import Flex from 'flexbox-react'
import Switch from '@material-ui/core/Switch'
/*

  <FormikCheckbox
    id="ID_HERE"
    label="LABEL_HERE"
    formikProps={props}
  />

*/
export function FormikToggle (props) {
  const { id, label } = props
  const { values, setFieldValue, handleChange } = props.formikProps

  const handleToggle = event => {
    setFieldValue(id, event.target.checked)
  }

  return (
    <Flex flexDirection="column" marginBottom="7px" marginLeft="10px">
      <Flex>
        {label}
      </Flex>
      <Flex>
        <Switch
          value={id}
          checked={values[id] || false}
          onChange={handleToggle}
        />
      </Flex>
    </Flex>
  )
}
