import React from 'react'
import Flex from 'flexbox-react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
//GeneratorToken: <next-import>
// import { } from './styled'


function <%= formNamePascalCase %>Raw (props) {
  const { values, onSubmit } = props

  return (
    <Flex flexDirection="column">
      //GeneratorToken: <fields>
      <Flex>
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
  //GeneratorToken: <validationSchema>
})
const formikConfig = {
  validationSchema,
  validateOnChange: true,
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      //GeneratorToken: <mapPropsToValues>
    }
  }
}
export const <%= formNamePascalCase %> = withFormik(formikConfig)(<%= formNamePascalCase %>Raw)
