import { validateYupSchema } from 'formik'


export const useForms = () => {
  const formIsValid = (values, validationSchema) => {
    try {
      validateYupSchema(values, validationSchema, true)
      return true
    } catch (err) {
      return false
    }
  }

  return {
    formIsValid
  }
}
