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



const getTemplateData = (url) => {
  return {
    url,
    urlPascalCase: strings.capitalizeFirstLetter(url),
    urlSnakeCase: strings.mapToSnakeCase(url)
  }
}

const updateTemplates = (templateData) => {
  // lodash templates choked on using JSON so I'm doing this 1 file manually
  templates = JSON.stringify(templates, null, 2)
  templates = templates.replace(/<%= urlSnakeCase %>/g, templateData.urlSnakeCase)
  templates = templates.replace(/<%= urlPascalCase %>/g, templateData.urlPascalCase)
  templates = JSON.parse(templates)
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

const createFolders = async (templateData) => {
  try {
    await fileSystem.makeDirectory(`${root}${seperator}src${seperator}components${seperator}routes${seperator}${templateData.urlSnakeCase}`)
  } catch (e) {
    messages.handleError(e, 'createFolders')
  }
}

// find the line where we want to insert the new route and tag with 'new-route'
const tagIndexOfNewRoute = (lines) => {
  const notFoundComment = '404 route must be last'
  const indexOf = lines.findIndex(line => {
    const found = line.text.indexOf(notFoundComment)
    return found > 0
  })

  //we actually want the line above the notFoundComment so we subtract 1
  lines[indexOf - 1].tag = 'new-route'
}

// find the line where we want to insert the import for new import and tag with 'new-import'
const tagIndexOfRouteComponentImport = (lines) => {
  const indexOf = lines.findIndex(line => {
    const found = line.text.length === 0
    return found > 0
  })

  lines[indexOf].tag = 'new-import'
}

//ToDo: call the one on the fileSystem
const insertAtTag = (lines, templateData, tag, text) => {
  const newLine = {
    text
  }
  const insertIndex = lines.findIndex(line => line.tag === tag)
  lines.splice(insertIndex, 0, newLine)
}

const updateRouteTable = async (templateData) => {
  try {
    const pathToRouteTable = `${root}${seperator}src${seperator}components${seperator}routes${seperator}RouteTable.jsx`
    const lines = await fileSystem.getLines(pathToRouteTable)

    // tag everything before we modify the file so it's not a moving target
    tagIndexOfNewRoute(lines)
    tagIndexOfRouteComponentImport(lines)

    const component = templateData.urlPascalCase
    const newImportText = `const ${ component } = Loadable({ loader: () => import('./${ templateData.urlSnakeCase }/${ component }'), loading: RouteLoading })`
    insertAtTag(lines, templateData, 'new-import', newImportText)

    const newRouteText = `      <AuthorizedRoute exact path="/${ templateData.urlSnakeCase }" component={${ templateData.urlPascalCase }} />`
    insertAtTag(lines, templateData, 'new-route', newRouteText)

    const text = lines.map(line => line.text)
    const data = text.join('\r\n')
    await fileSystem.writeFile(pathToRouteTable, data)
    messages.success('Updated RouteTable.jsx')
  } catch (e) {
    messages.handleError(e, 'updateRouteTable')
  }
}

const tagIndexOfImport = (lines) => {
  const indexOf = lines.findIndex(line => line.text.indexOf('<next-import>') !== -1)

  //we actually want the line above the notFoundComment so we subtract 1
  lines[indexOf].tag = 'next-import'
}

const tagIndexOfRoutePreload = (lines) => {
  const indexOf = lines.findIndex(line => line.text.indexOf('<next-preload>') !== -1)

  //we actually want the line above the notFoundComment so we subtract 1
  lines[indexOf].tag = 'next-preload'
}

const updatePreloadRoutes = async (templateData) => {
  try {
    const pathToPreloadRoutes = `${root}${seperator}src${seperator}components${seperator}routes${seperator}PreloadRoutes.js`
    const lines = await fileSystem.getLines(pathToPreloadRoutes)

    // tag everything before we modify the file so it's not a moving target
    tagIndexOfImport(lines)
    tagIndexOfRoutePreload(lines)

    const component = templateData.urlPascalCase
    const newImportText = `const ${component} = Loadable({ loader: () => import('./${templateData.urlSnakeCase}/${component}'), loading: RouteLoading })`
    insertAtTag(lines, templateData, 'next-import', newImportText)

    const newPreloadText = `    ${component}.preload()`
    insertAtTag(lines, templateData, 'next-preload', newPreloadText)

    const text = lines.map(line => line.text)
    const data = text.join('\r\n')
    await fileSystem.writeFile(pathToPreloadRoutes, data)
    messages.success('Updated PreloadRoutes.jsx')
  } catch (e) {
    messages.handleError(e, 'updatePreloadRoutes')
  }
}

const addRoute = async (url) => {
  const templateData = getTemplateData(url)
  updateTemplates(templateData)
  await createFolders(templateData)
  await addTemplates(templateData)
  await updateRouteTable(templateData)
  await updatePreloadRoutes(templateData)
}

module.exports = {
  addRoute
}
