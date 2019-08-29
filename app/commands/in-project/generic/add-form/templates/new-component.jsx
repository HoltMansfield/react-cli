import React from 'react'
import Flex from 'flexbox-react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
//GeneratorToken: <next-import>
// import { } from './styled'


function <%= formNamePascalCase %>Raw (props) {
  const { values, onSubmit, resetForm } = props
  //GeneratorToken: <next-options>

  return (
    <Flex flexDirection="column">
      //GeneratorToken: <fields>
      <Flex>
        <SubmitButton
          onSubmit={() => onSubmit(values, resetForm)}
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
  //GeneratorToken: <validationSchema>
})
const formikConfig = {
  validationSchema,
  validateOnChange: true,
  enableReinitialize: true,
  mapPropsToValues: props => {
    const initialValues = props.initialValues || {}
    return {
      //GeneratorToken: <mapPropsToValues>
    }
  }
}
export const <%= formNamePascalCase %> = withFormik(formikConfig)(<%= formNamePascalCase %>Raw)
