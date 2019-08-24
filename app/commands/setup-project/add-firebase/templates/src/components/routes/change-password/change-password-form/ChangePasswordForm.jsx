import React from 'react'
import Flex from 'flexbox-react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { SubmitButton, FormikTextField } from 'components'
// import { } from './styled'


function ChangePasswordFormRaw (props) {
  const { values, onSubmit } = props


  return (
    <Flex flexDirection="column">
      <Flex>
        <FormikTextField
          id="password"
          label="Password"
          formikProps={props}
        />
      </Flex>
      <Flex>
        <SubmitButton
          onSubmit={() => onSubmit(values.password)}
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
  password: Yup.string().required('Password is required'),
})
const formikConfig = {
  validationSchema,
  validateOnChange: true,
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      password: '',
    }
  }
}
export const ChangePasswordForm = withFormik(formikConfig)(ChangePasswordFormRaw)
