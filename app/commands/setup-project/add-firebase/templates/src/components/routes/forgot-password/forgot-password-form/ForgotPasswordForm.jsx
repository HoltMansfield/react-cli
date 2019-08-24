import React from 'react'
import Flex from 'flexbox-react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { SubmitButton, FormikTextField } from 'components'
// import { } from './styled'


function ForgotPasswordFormRaw (props) {
  const { values, onSubmit } = props


  return (
    <Flex flexDirection="column">
      <Flex>
        <FormikTextField
          id="email"
          label="Email"
          formikProps={props}
        />
      </Flex>
      <Flex>
        <SubmitButton
          onSubmit={() => onSubmit(values.email)}
          values={values}
          validationSchema={validationSchema}
        >
          Save
        </SubmitButton>
      </Flex>
    </Flex>
  )
}
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
})
const formikConfig = {
  validationSchema,
  validateOnChange: true,
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      email: '',
    }
  }
}
export const ForgotPasswordForm = withFormik(formikConfig)(ForgotPasswordFormRaw)
