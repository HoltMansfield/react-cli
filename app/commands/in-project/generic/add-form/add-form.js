const rek = require('rekuire')
const _ = require('lodash')
const projectPaths = rek('project-paths')
const messages = rek('console-messages')
const fileSystem = rek('file-system')
const strings = rek('strings')
const { checkForFirebaseCollectionDefinition } = rek('fb-verify')
let templates = require('./templates/templates.json')


const root = projectPaths.getProjectRoot(__dirname)
let nextForm


const checkForJsonDefinition = () => {
  const path = `${root}/cli/forms/next-form.js`
  try {
    nextForm = require(path)
  } catch (e) {
    messages.error(`Missing JSON form definition at: ${path}`)
    messages.info(`Please see instructions here: ${root}/cli/forms/readMe.md`)
  }
}

const getTemplateData = (formName, formSuffix) => {
  formName = `${formName}${formSuffix}`

  return {
    formName,
    formNamePascalCase: strings.capitalizeFirstLetter(formName),
    formNameSnakeCase: strings.mapToSnakeCase(formName)
  }
}

const updateTemplates = (templateData) => {
  templates = JSON.stringify(templates, null, 2)
  templates = templates.replace(/<%= formNameSnakeCase %>/g, templateData.formNameSnakeCase)
  templates = templates.replace(/<%= formNamePascalCase %>/g, templateData.formNamePascalCase)
  templates = templates.replace(/<%= formName %>/g, templateData.formName)
  templates = JSON.parse(templates)
}

const createFolders = async (templateData) => {
  try {
    await fileSystem.makeDirectory(`${root}/src/components/${templateData.formNameSnakeCase}`)
  } catch (e) {
    messages.handleError(e, 'createFolders')
  }
}

const createFirebaseFolders = async (templateData) => {
  const { collectionName, collectionNameSingularPascalCase } = templateData
  try {
    const path = `src/components/firebase/collections/${collectionName}/forms`
    await fileSystem.makeDirectory(path)

  } catch (e) {
    messages.handleError(e, 'createFirebaseFolders')
  }
}

const getHashOfTypes = () => {
  const types = {}

  Object.keys(nextForm).forEach(function(key) {
    types[nextForm[key].type] = nextForm[key].type
  })

  return types
}

const getImportForType = (type) => {
  switch(type) {
    case 'string':
      return 'FormikTextField'
    case 'boolean':
      return 'FormikCheckbox'
    case 'checkboxes':
      return 'FormikCheckboxArray'
    case 'radioButtons':
      return 'FormikRadioButtons'
    case 'select':
      return 'FormikSelect'
    case 'yesNo':
      return 'FormikYesNo'
    case 'date':
      return 'FormikDatePicker'
    case 'time':
      return 'FormikTimePicker'
    case 'toggle':
      return 'FormikToggle'
    default:
      throw new Error(`${type} not found in getImportForType`)
  }
}

const getImports = () => {
  const types = getHashOfTypes()
  const imports = ['SubmitButton']

  Object.keys(types).forEach(function(key) {
    // types is a hash with types as keys
    imports.push(getImportForType(types[key]))
  })

  return `import { ${imports.join(', ')} } from 'components'`
}

const getOptions = () => {
  const options = []

  Object.keys(nextForm).forEach(function(key) {
    if (nextForm[key].options) {
      const optionsText = `\tconst ${key}Options = ${JSON.stringify(nextForm[key].options, null, 2)}`
      // drop the quotes around property names
      options.push(optionsText.replace(/\"([^(\")"]+)\":/g,"$1:"))
    }
  })

  return options.join('\n')
}

const updateFormName = (lines, templateData) => {
  return lines.map(line => {
    const text = line.text.replace(/<%= formNamePascalCase %>/g, templateData.formNamePascalCase)

    return {
      ...line,
      text
    }
  })
}

const getField = (name, fieldDefinition) => {
  // map name to a useable label
  const inferredLabel = strings.capitalizeFirstLetter(name).match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
  // allow the user to provide their own label in the text property
  const label = fieldDefinition.text ? fieldDefinition.text : inferredLabel

  switch(fieldDefinition.type) {
    case 'string':
      return `      <Flex>
        <FormikTextField
          id="${name}"
          label="${label}"
          formikProps={props}
        />
      </Flex>`
    case 'boolean':
      return `      <Flex>
        <FormikCheckbox
          id="${name}"
          label="${label}"
          formikProps={props}
        />
      </Flex>`
    case 'checkboxes':
      return `      <Flex>
        <FormikCheckboxArray
          id="${name}"
          label="${label}"
          checkboxes={${name}Options}
          formikProps={props}
        />
      </Flex>`
    case 'radioButtons':
      return `      <Flex>
        <FormikRadioButtons
          id="${name}"
          label="${label}"
          formikProps={props}
          options={${name}Options}
        />
      </Flex>`
    case 'select':
      return `      <Flex>
        <FormikSelect
          id="${name}"
          label="${label}"
          formikProps={props}
          items={${name}Options}
          width={300}
        />
      </Flex>`
    case 'toggle':
      return `      <Flex>
        <FormikToggle
          id="${name}"
          label="${label}"
          formikProps={props}
        />
      </Flex>`
      case 'date':
        return `      <Flex>
        <FormikDatePicker
          id="${name}"
          label="${label}"
          formikProps={props}
        />
      </Flex>`
      case 'time':
        return `      <Flex>
        <FormikTimePicker
          id="${name}"
          label="${label}"
          formikProps={props}
        />
      </Flex>`
      default:
        throw new Error(`${fieldDefinition.type} not found in getField`)
  }
}

const getFields = () => {
  const fields = []

  Object.keys(nextForm).forEach(function(key) {
    fields.push(getField(key, nextForm[key]))
  })

  return fields.join('\r\n')
}

const getValidationRule = (name, fieldDefinition) => {
  const label = strings.capitalizeFirstLetter(name).match(/[A-Z][a-z]+|[0-9]+/g).join(" ")

  switch(fieldDefinition.type) {
    case 'string':
      return `  ${name}: Yup.string().required('${label} is required'),`
    case 'boolean':
      return `  ${name}: Yup.boolean().required('${label} is required'),`
    case 'checkboxes':
      return `  ${name}: Yup.array().required('${label} is required'),`
    case 'radioButtons':
      return `  ${name}: Yup.string().required('${label} is required'),`
    case 'select':
      return `  ${name}: Yup.string().required('${label} is required'),`
    case 'toggle':
      return `  ${name}: Yup.boolean().required('${label} is required'),`
    case 'date':
      return `  ${name}: Yup.date().required('${label} is required'),`
    case 'time':
      return `  ${name}: Yup.date().required('${label} is required'),`
    default:
      throw new Error(`${fieldDefinition.type} not found in getValidationRule`)
  }
}

const getValidation = () => {
  const types = getHashOfTypes()
  const rules = []

  Object.keys(nextForm).forEach(function(key) {
    rules.push(getValidationRule(key, nextForm[key]))
  })

  return rules.join('\r\n')
}

const getInitialValue = (name, type) => {
  const label = strings.capitalizeFirstLetter(name).match(/[A-Z][a-z]+|[0-9]+/g).join(" ")

  switch(type) {
    case 'string':
      return `      ${name}: initialValues.${name} || '',`
    case 'boolean':
      return `      ${name}: initialValues.${name} || null,`
    case 'checkboxes':
      return `      ${name}: initialValues.${name} || [],`
    case 'radioButtons':
      return `      ${name}: initialValues.${name} || null,`
    case 'select':
      return `      ${name}: initialValues.${name} || '',`
    case 'toggle':
      return `      ${name}: initialValues.${name} || '',`
    case 'date':
      return `      ${name}: initialValues.${name} || null,`
    case 'time':
      return `      ${name}: initialValues.${name} || null,`
    default:
      throw new Error(`${fieldDefinition.type} not found in getInitialValue`)
  }
}

const getInitialization = () => {
  const types = getHashOfTypes()
  const initializers = []

  Object.keys(nextForm).forEach(function(key) {
    initializers.push(getInitialValue(key, nextForm[key].type))
  })

  return initializers.join('\r\n')
}

const getDestinationPath = (templateData, fbAddCreateTemplateData) => {
  const { formNamePascalCase, formNameSnakeCase} = templateData
  const { collectionName, collectionNameSingularPascalCase } = fbAddCreateTemplateData

  if(fbAddCreateTemplateData) {
    return `src/components/firebase/collections/${collectionName}/forms/${collectionNameSingularPascalCase}Form.jsx`
  }

  return `${root}/src/components/${formNameSnakeCase}/${formNamePascalCase}.jsx`
}

const buildForm = async (templateData, fbAddCreateTemplateData) => {
  const path = `${__dirname}/templates/new-component.jsx`
  const destinationPath = getDestinationPath(templateData, fbAddCreateTemplateData)
  let lines = await fileSystem.getLines(path)

  lines = updateFormName(lines, templateData)

  const importText = getImports()
  fileSystem.insertAtGeneratorTag(lines, '//GeneratorToken: <next-import>', importText)

  const optionsText = getOptions()
  fileSystem.insertAtGeneratorTag(lines, '//GeneratorToken: <next-options>', optionsText)

  const fields = getFields()
  fileSystem.insertAtGeneratorTag(lines, '//GeneratorToken: <fields>', fields)

  const validation = getValidation()
  fileSystem.insertAtGeneratorTag(lines, '//GeneratorToken: <validationSchema>', validation)

  const initialization = getInitialization()
  fileSystem.insertAtGeneratorTag(lines, '//GeneratorToken: <mapPropsToValues>', initialization)

  const text = lines.map(line => line.text)
  const data = text.join('\r\n')

  await fileSystem.writeFile(destinationPath, data)
  messages.success(`added form: ${destinationPath}`)
}

const addTemplates = async (templateData) => {
  const promises = []

  try {
    for (template of templates) {
      if (template.templatePath !== '/new-component.jsx') {
        // skip this file we process it in buildForm
        const templatePath = `${__dirname}/templates/${template.templatePath}`
        templateFileContent = await fileSystem.readFile(templatePath)

        // create a lodash template
        compiled = _.template(templateFileContent)
        // compile the template and data
        templateFileContent = compiled(templateData)

        // where the file will live in the final project
        const destinationPath = `${root}/${template.destinationPath}`

        // queue the file to be written to disk
        promises.push(fileSystem.writeFile(destinationPath, templateFileContent))
        messages.success(`Added file: ${destinationPath}`)
      }
    }

    await Promise.all(promises)
  } catch (e) {
    messages.handleError(e, 'addTemplates')
  }
}

const addForm = async (formName) => {
  try {
    checkForJsonDefinition()
    const templateData = getTemplateData(formName)
    updateTemplates(templateData)
    await createFolders(templateData)
    await buildForm(templateData)
    // await addTemplates(templateData)
  } catch (e) {
    messages.handleError(e, 'addForm')
  }
}

const addFirebaseForm = async (fbAddCreateTemplateData) => {
  try {
    nextForm = checkForFirebaseCollectionDefinition(root, fbAddCreateTemplateData.collectionName)

    if (nextForm) {
      const templateData = getTemplateData(fbAddCreateTemplateData.collectionNameSingular, 'Form')
      updateTemplates(templateData, fbAddCreateTemplateData)
      await createFirebaseFolders(fbAddCreateTemplateData)
      await buildForm(templateData, fbAddCreateTemplateData)
    }
    // await addTemplates(templateData)
  } catch (e) {
    messages.handleError(e, 'addForm')
  }
}

module.exports = {
  addForm,
  addFirebaseForm
}
