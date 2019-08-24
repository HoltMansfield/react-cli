import React from 'react'
import Flex from 'flexbox-react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { SubmitButton, FormikTextField } from 'components'
// import { } from './styled'


function LoginFormRaw (props) {
  const { values, onSubmit } = props

  return (
    <Flex flexDirection="column" flexGrow={1}>
      <Flex>
        <FormikTextField
          id="email"
          label="Email"
          formikProps={props}
        />
      </Flex>
      <Flex>
        <FormikTextField
          id="password"
          label="Password"
          formikProps={props}
        />
      </Flex>
      <Flex marginTop="10px">
        <SubmitButton
          onSubmit={() => onSubmit(values)}
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
  password: Yup.string().required('Password is required')
})
const formikConfig = {
  validationSchema,
  validateOnChange: true,
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      email: '',
      password: ''
    }
  }
}
export const LoginForm = withFormik(formikConfig)(LoginFormRaw)
