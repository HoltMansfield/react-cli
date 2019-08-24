import { validateYupSchema } from 'formik'


export const formIsComplete = (values, errors, dirty) => {
  let isValid = true

  if (!dirty) {
    return false
  }

  Object.keys(values).forEach(function(key) {
    if (!values[key]) {
      isValid = false
    }
  })

  return isValid
}

export const formIsValid = (values, validationSchema) => {
  try {
    validateYupSchema(values, validationSchema, true)
    return true
  } catch (err) {
    return false
  }
}

export const getErrors = (fieldName, errors, touched) => {
  if (errors[fieldName] && touched[fieldName]) {
    return errors[fieldName]
  }

  return null
}

export const hasErrors = (fieldName, errors, touched) => {
  return getErrors(fieldName, errors, touched) !== null
}
