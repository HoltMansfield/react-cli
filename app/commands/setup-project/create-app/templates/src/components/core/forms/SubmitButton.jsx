import React from 'react'
import Flex from 'flexbox-react'
import Button from '@material-ui/core/Button'
import { useForms } from 'hooks/core/use-forms/useForms'


export function SubmitButton ({ children, onSubmit, values, validationSchema }) {
  const { formIsValid } = useForms()
  const disabled = !formIsValid(values, validationSchema)

  return (
    <Flex flexGrow={1} margin="0 10px">
      <Button variant="contained" color="primary" onClick={onSubmit} disabled={disabled}>
        {children}
      </Button>
    </Flex>
  )
}
