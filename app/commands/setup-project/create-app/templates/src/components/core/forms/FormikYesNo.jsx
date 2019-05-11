import React, { Component } from 'react'
import Flex from 'flexbox-react'
import Radio from '@material-ui/core/Radio'
/*

  <FormikYesNo
    id="ID_HERE"
    formikProps={props}
  />

*/
export function FormikYesNo (props) {
  const { id, label, flexDirection, formikProps: { setFieldValue, values } } = props

  const handleChange = (event) => {
    const newValue = event.target.value === 'Yes'

    setFieldValue(id, newValue)
  }

  return (
    <Flex marginTop="10px" flexDirection="column">
      <Flex marginLeft="10px">{label}</Flex>
      <Flex>
        <Flex direction={flexDirection || 'row'}>
          <Flex key="yes" alignItems="center">
            <Flex>
              <Radio
                checked={values[id] === true}
                onChange={handleChange}
                value="Yes"
                name="id-yes"
                inputProps={{
                  "aria-label": 'Yes'
                }}
              />
            </Flex>
            <Flex>Yes</Flex>
          </Flex>
          <Flex key="no" alignItems="center">
            <Flex>
              <Radio
                checked={values[id] === false}
                onChange={handleChange}
                value="No"
                name="id-no"
                inputProps={{
                  "aria-label": 'No'
                }}
              />
            </Flex>
            <Flex>No</Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
