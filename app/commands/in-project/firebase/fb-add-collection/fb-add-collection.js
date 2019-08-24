/* eslint max-len: "off" */
const rek = require('rekuire')
const _ = require('lodash')
const pluralize = require('pluralize')
const projectPaths = rek('project-paths')
const messages = rek('console-messages')
const fileSystem = rek('file-system')
let templates = require('./templates/templates.json')
const strings = rek('strings')

const root = projectPaths.getProjectRoot(__dirname)
const seperator = projectPaths.getSeparator()


const getWhereClause = (searchProperty) => {
  if (!searchProperty.includes(',')) {
    return `{ property: '${searchProperty}', operator: '==', value: ${searchProperty} }`
  }

  const properties = searchProperty.split(',')
  // start the  array
  let whereClause = '['
  properties.forEach(property => {
    whereClause += `\r\n\t\t\t{ property: '${property}', operator: '==', value: ${property} },`
  })
  // trim the trailing comma
  whereClause = whereClause.slice(0, -1)
  // finish the array
  whereClause += '\r\n\t\t]'
  return whereClause
}

const getFindFunctionSignature = (searchProperty) => {
  if (!searchProperty.includes(',')) {
    return searchProperty
  }

  const properties = searchProperty.split(',')
  let signature = ''
  properties.forEach(property => {
    signature += `${property}, `
  })
  // trim the trailing comma and space
  signature = signature.slice(0, -2)
  return signature
}

const getTemplateData = (collectionName, searchProperty) => {
  return {
    collectionName: pluralize(collectionName),
    collectionNamePascalCase: strings.capitalizeFirstLetter(pluralize(collectionName)),
    collectionNameSnakeCase: strings.mapToSnakeCase(pluralize(collectionName)),
    collectionNameSingular: collectionName,
    collectionNameSingularPascalCase: strings.capitalizeFirstLetter(collectionName),
    searchProperty,
    whereClause: getWhereClause(searchProperty),
    findFunctionSignature: getFindFunctionSignature(searchProperty)
  }
}

const updateTemplates = (templateData) => {
  // lodash templates choked on using JSON so I'm doing this 1 file manually
  templates = JSON.stringify(templates, null, 2)
  templates = templates.replace(/<%= collectionNameSnakeCase %>/g, templateData.collectionNameSnakeCase)
  templates = templates.replace(/<%= collectionNamePascalCase %>/g, templateData.collectionNamePascalCase)
  templates = JSON.parse(templates)
}

//toDO: move to file-system
const addTemplates = async (templateData) => {
  const promises = []

  try {
    for (template of templates) {
      const templatePath = `${__dirname}${seperator}templates${seperator}${template.templatePath}`
      templateFileContent = await fileSystem.readFile(templatePath)

      // create a lodash template
      compiled = _.template(templateFileContent)
      // compile the template and data
      templateFileContent = compiled(templateData)

      // where the file will live in the final project
      const destinationPath = `${root}${seperator}${template.destinationPath}`

      // queue the file to be written to disk
      promises.push(fileSystem.writeFile(destinationPath, templateFileContent))
      messages.success(`Added file: ${destinationPath}`)
    }

    await Promise.all(promises)
  } catch (e) {
    messages.handleError(e, 'addTemplates')
  }
}

const createFolders = async (templateData) => {
  try {
    await fileSystem.makeDirectory(`${root}/src/hooks/core/firebase/collections/use-${templateData.collectionNameSnakeCase}`)
  } catch (e) {
    messages.handleError(e, 'createFolders')
  }
}

const fbAddCollection = async (collectionName, searchProperty) => {
  const templateData = getTemplateData(collectionName, searchProperty)
  updateTemplates(templateData)
  await createFolders(templateData)
  await addTemplates(templateData)
}

module.exports = {
  fbAddCollection
}
