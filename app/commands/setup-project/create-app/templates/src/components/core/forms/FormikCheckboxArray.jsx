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

  const getIdAndLabel = (checkbox) => {
    if (checkbox.id) {
      // array of objects
      return {
        id: checkbox.id,
        label: checkbox.label
      }
    }

    return {
      // array of strings
      id: checkbox,
      label: checkbox
    }
  }

  const getCheckedState = (checkbox) => {
    if (checkbox.id) {
      return values[id].includes(checkbox.id)
    }

    return values[id].includes(checkbox)
  }

  const renderCheckboxes = () => {
    return checkboxes.map(cb => {
      const { id, label } = getIdAndLabel(cb)

      return (
        <Flex alignItems="center" key={id}>
          <Flex>
            <Checkbox
              checked={getCheckedState(cb)}
              onChange={handleChange(id)}
              onBlur={handleBlur}
              color="primary"
              inputProps={{
                "aria-label": label
              }}
            />
          </Flex>
          <Flex>
            {label}
          </Flex>
        </Flex>
      )
    })
  }

  return (
    <Flex flexDirection="column">
      <Flex margin="0 10px">{label}</Flex>
      <Flex marginRight="10px">{renderCheckboxes()}</Flex>
    </Flex>
  )

}
