/* eslint max-len: "off" */
const rek = require('rekuire')
const _ = require('lodash')
const projectPaths = rek('project-paths')
const messages = rek('console-messages')
const fileSystem = rek('file-system')
let templates = require('./templates/templates.json')
const strings = rek('strings')

const root = projectPaths.getProjectRoot(__dirname)
const seperator = projectPaths.getSeparator()



const getTemplateData = (componentName) => {
  return {
    componentName,
    componentNamePascalCase: strings.capitalizeFirstLetter(componentName),
    componentNameSnakeCase: strings.mapToSnakeCase(componentName)
  }
}

const updateTemplates = (templateData) => {
  // lodash templates choked on using JSON so I'm doing this 1 file manually
  templates = JSON.stringify(templates, null, 2)
  templates = templates.replace(/<%= componentNameSnakeCase %>/g, templateData.componentNameSnakeCase)
  templates = templates.replace(/<%= componentNamePascalCase %>/g, templateData.componentNamePascalCase)
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
    await fileSystem.makeDirectory(`${root}${seperator}src${seperator}components${seperator}${templateData.componentNameSnakeCase}`)
  } catch (e) {
    messages.handleError(e, 'createFolders')
  }
}

const addSimpleComponent = async (componentName) => {
  const templateData = getTemplateData(componentName)
  updateTemplates(templateData)
  await createFolders(templateData)
  await addTemplates(templateData)
}

module.exports = {
  addSimpleComponent
}
