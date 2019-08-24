import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Flex from 'flexbox-react'
/*
    <FormikCheckboxArray
      id="ID_HERE"
      checkboxes={checkboxes}
      formikProps={props}
    />

    // Add this property to your component
    const checkboxes = [
      {
        id: '1',
        label: 'Choose Option 1'
      },
      {
        id: '2',
        label: 'Choose Option 2'
      }
    ]

    // Formik validation
    ID_HERE: Yup.array().required('Please check at least one that applies')
*/
export function FormikCheckboxArray (props) {
  const { id, label, checkboxes } = props
  const { formikProps: { values, setFieldValue, setFieldTouched } } = props

  const handleChange = checkboxId => event => {
    if (event.target.checked) {
      // add the element if it doesn't already exist
      const matches = values[id].find(v => v === checkboxId)
      if (matches === undefined) {
        values[id].push(checkboxId)
      }
    } else {
      // filter out the element
      values[id] = values[id].filter(v => v !== checkboxId)
    }

    setFieldValue(id, values[id])
    setFieldTouched(id, true)
  }

  const handleBlur = () => {
    setFieldTouched(id, true)
  }

  const renderCheckboxes = () => {
    return checkboxes.map(cb => (
      <Flex alignItems="center" key={cb.id}>
        <Flex>
          <Checkbox
            checked={values[id].includes(cb.id)}
            onChange={handleChange(cb.id)}
            onBlur={handleBlur}
            color="primary"
            inputProps={{
              "aria-label": cb.label
            }}
          />
        </Flex>
        <Flex>
          {cb.label}
        </Flex>
      </Flex>
    ))
  }

  return (
    <Flex flexDirection="column">
      <Flex margin="0 10px">{label}</Flex>
      <Flex marginRight="10px">{renderCheckboxes()}</Flex>
    </Flex>
  )

}
