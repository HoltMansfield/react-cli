/* eslint max-len: "off" */
const rek = require('rekuire')
const _ = require('lodash')
const projectPaths = rek('project-paths')
const messages = rek('messages')
const fileSystem = rek('file-system')
const strings = rek('strings')
let templates = require('./templates/templates.json')


const root = projectPaths.getProjectRoot(__dirname)
const seperator = projectPaths.getSeparator()

const getTemplateData = (hookName) => {
  return {
    hookName,
    hookNamePascalCase: strings.capitalizeFirstLetter(hookName),
    hookNameSnakeCase: strings.mapToSnakeCase(hookName)
  }
}

const updateTemplates = (templateData) => {
  templates = JSON.stringify(templates, null, 2)
  templates = templates.replace(/<%= hookNameSnakeCase %>/g, templateData.hookNameSnakeCase)
  templates = templates.replace(/<%= hookName %>/g, templateData.hookName)
  templates = JSON.parse(templates)
}

const createFolders = async (templateData) => {
  try {
    await fileSystem.makeDirectory(`${root}${seperator}src${seperator}hooks${seperator}${templateData.hookNameSnakeCase}`)
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

const addHook = async (reducerName) => {
  const templateData = getTemplateData(reducerName)
  updateTemplates(templateData)
  await createFolders(templateData)
  await addTemplates(templateData)
}

module.exports = {
  addHook
}
