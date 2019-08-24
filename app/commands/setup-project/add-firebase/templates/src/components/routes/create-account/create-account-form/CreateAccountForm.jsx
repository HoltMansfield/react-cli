import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { FormContainer, FormikTextField, SubmitButton } from 'components'
// import { } from './styled'


function CreateAccountFormRaw (props) {
  const { values, onSubmit } = props

  return (
    <FormContainer>
      <Grid container spacing={0}>
        <Grid item xs={12}>
            <FormikTextField
              id="email"
              label="Email"
              formikProps={props}
            />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            id="password"
            label="Password"
            formikProps={props}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            id="confirmPassword"
            label="Confirm Password"
            formikProps={props}
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton
            onSubmit={() => onSubmit(values)}
            values={values}
            validationSchema={validationSchema}
          >
            Save
          </SubmitButton>
        </Grid>
      </Grid>
    </FormContainer>
  )
}
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
  confirmPassword: Yup.string().required('Confirm Password is required'),
})
const formikConfig = {
  validationSchema,
  validateOnChange: true,
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  }
}
export const CreateAccountForm = withFormik(formikConfig)(CreateAccountFormRaw)
