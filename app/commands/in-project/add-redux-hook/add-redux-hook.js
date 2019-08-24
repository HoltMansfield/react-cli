/* eslint max-len: "off" */
const rek = require('rekuire')
const _ = require('lodash')
const projectPaths = rek('project-paths')
const messages = rek('console-messages')
const fileSystem = rek('file-system')
const strings = rek('strings')
let templates = require('./templates/templates.json')


const root = projectPaths.getProjectRoot(__dirname)
const seperator = projectPaths.getSeparator()

const getTemplateData = (hookName, reducerName, reducerProperty) => {
  // we can infer the name of the action creator format of set<ReducerProperty>
  const actionCreator = `set${strings.capitalizeFirstLetter(reducerProperty)}`
  return {
    hookName, reducerName, reducerProperty, actionCreator,
    hookNamePascalCase: strings.capitalizeFirstLetter(hookName),
    hookNameSnakeCase: strings.mapToSnakeCase(hookName),
    reducerNameSnakeCase: strings.mapToSnakeCase(reducerName),
    reducerPropertyPascalCase: strings.capitalizeFirstLetter(reducerProperty)
  }
}

const updateTemplates = (templateData) => {
  templates = JSON.stringify(templates, null, 2)
  templates = templates.replace(/<%= hookNameSnakeCase %>/g, templateData.hookNameSnakeCase)
  templates = templates.replace(/<%= hookName %>/g, templateData.hookName)
  templates = templates.replace(/<%= reducerNameSnakeCase %>/g, templateData.reducerNameSnakeCase)
  templates = JSON.parse(templates)
}

const createFolders = async (templateData) => {
  try {
    await fileSystem.makeDirectory(`${root}/src/hooks/redux/${templateData.reducerNameSnakeCase}/${templateData.hookNameSnakeCase}`)
  } catch (e) {
    messages.handleError(e, 'createFolders')
  }
}

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

const addReduxHook = async (hookName, reducerName, reducerProperty) => {
  const templateData = getTemplateData(hookName, reducerName, reducerProperty)
  updateTemplates(templateData)
  await createFolders(templateData)
  await addTemplates(templateData)
}

module.exports = {
  addReduxHook
}
