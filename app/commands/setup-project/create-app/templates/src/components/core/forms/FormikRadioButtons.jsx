import React from 'react'
import Flex from 'flexbox-react'
import Radio from '@material-ui/core/Radio'
/*

  <FormikRadioButtons
    id="ID_HERE"
    formikProps={props}
    options={['Yes', 'No']}
  />

*/
export function FormikRadioButtons (props) {
  const { id, label, flexDirection, options } = props
  const { setFieldValue, values } = props.formikProps

  const handleChange = (event) => {
    setFieldValue(id, event.target.value)
  }

  const renderOptions = (options, value) => {
    return options.map((option, index) => {
      return (
        <div key={option}>
          <Radio
            checked={value === option}
            onChange={handleChange}
            value={option}
            name={`id-${index}`}
            inputProps={{
              "aria-label": option
            }}
          />
          <span>{option}</span>
        </div>
      )
    })
  }

  return (
    <Flex marginTop="10px" flexDirection="column">
      <Flex marginLeft="10px">{label}</Flex>
      <Flex>
        <Flex direction={flexDirection || 'row'}>
          {renderOptions(options, values[id])}
        </Flex>
      </Flex>
    </Flex>
  )
}
