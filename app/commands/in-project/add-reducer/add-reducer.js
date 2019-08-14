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


const getTemplateData = (reducerName, reducerProperty) => {
  const reducerPropertyPascalCase = strings.capitalizeFirstLetter(reducerProperty)
  const actionType = `SET_${strings.mapToUnderbarsAllCaps(reducerProperty)}`

  return {
    reducerName,
    reducerFileName: strings.mapToSnakeCase(reducerName),
    reducerProperty,
    reducerPropertyPascalCase,
    setReducerPropertyFunction: `set${reducerPropertyPascalCase}`,
    actionType
  }
}

const updateTemplates = (templateData) => {
  templates = JSON.stringify(templates, null, 2)
  templates = templates.replace(/<%= reducerFileName %>/g, templateData.reducerFileName)
  templates = JSON.parse(templates)
}

const createFolders = async (templateData) => {
  try {
    await fileSystem.makeDirectory(`${root}${seperator}src${seperator}redux${seperator}actions${seperator}${templateData.reducerFileName}`)
    await fileSystem.makeDirectory(`${root}${seperator}src${seperator}redux${seperator}reducers${seperator}${templateData.reducerFileName}`)
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

// find the line where we want to insert the new route and tag with 'new-route'
const tagIndexOfNewActions = (lines) => {
  const closingBrace = '}'
  const indexOf = lines.findIndex(line => {
    const found = line.text === closingBrace
    return found > 0
  })

  //we actually want the line above the closingBrace so we subtract 1
  lines[indexOf - 1].tag = 'new-actions'
}

// find the line where we want to insert the import for new import and tag with 'new-import'
const tagIndexOfImport = (lines) => {
  const indexOf = lines.findIndex(line => {
    const found = line.text.length === 0
    return found > 0
  })

  //we actually want the line above the notFoundComment so we subtract 1
  lines[indexOf] = {
    tag: 'new-import',
    text: lines[indexOf].text // preserve the text for debugging purposes
  }
}

const alphabetizeActionsIndex = (lines) => {
  fileSystem.tagLine(lines, 'start', 'export {', 1)
  fileSystem.tagLine(lines, 'end', '}', -1)
  fileSystem.alphabetizeExports(lines)

  // no tagging needed for this one
  const leading = 'import * as '
  fileSystem.alphabetizeImports(lines, leading)
}

const updateActionsIndex = async (templateData) => {
  try {
    const path = `${root}${seperator}src${seperator}redux${seperator}actions${seperator}index.js`
    const lines = await fileSystem.getLines(path)

    // tag everything before we modify the file so it's not a moving target
    tagIndexOfImport(lines)
    tagIndexOfNewActions(lines)

    const { reducerFileName, reducerName } = templateData
    const newImportText = `import * as ${reducerName} from './${reducerFileName}/${reducerFileName}'`

    fileSystem.insertAtTag(lines, 'new-import', newImportText)
    fileSystem.insertAtTag(lines, 'new-action', `${reducerName},`)
    alphabetizeActionsIndex(lines)

    const text = lines.map(line => line.text)
    const data = text.join('\r\n')

    await fileSystem.writeFile(path, data)
    messages.success('Updated /redux/actions/index.js')
  } catch (e) {
    messages.handleError(e, 'updateActionsIndex')
  }
}

// find the line where we want to insert the import for new import and tag with 'new-import'
const tagIndexOfReducerImport = (lines) => {
  const indexOf = lines.findIndex(line => {
    return line.text.trim() === '// end of reducers'
  })

  lines[indexOf - 1].tag = 'new-import'
}

// find the line where we want to insert the new route and tag with 'new-route'
const tagIndexOfNewReducer = (lines) => {
  const closingBrace = '})'
  const indexOf = lines.findIndex(line => {
    const found = line.text === closingBrace
    return found > 0
  })

  //we actually want the line above the closingBrace so we subtract 1
  lines[indexOf - 1].tag = 'new-reducer'
}

const alphabetizeReducersIndex = (lines) => {
  fileSystem.tagLine(lines, 'start', 'const rootReducer = combineReducers({', 1)
  fileSystem.tagLine(lines, 'end', '})', -1)
  fileSystem.alphabetizeExports(lines)

  // no tagging needed for this one
  const leading = 'import { '
  fileSystem.alphabetizeReducerImports(lines, leading, 'reducer')
}

const updateReducersIndex = async (templateData) => {
  try {
    const path = `${root}${seperator}src${seperator}redux${seperator}reducers${seperator}index.js`
    const lines = await fileSystem.getLines(path)

    // tag everything before we modify the file so it's not a moving target
    tagIndexOfReducerImport(lines)
    tagIndexOfNewReducer(lines)

    const { reducerFileName, reducerName } = templateData
    const newImportText = `import { ${reducerName} } from './${reducerFileName}/${reducerFileName}'`

    fileSystem.insertAtTag(lines, 'new-import', newImportText)
    fileSystem.insertAtTag(lines, 'new-reducer', `  ${reducerName},`)
    alphabetizeReducersIndex(lines)

    const text = lines.map(line => line.text)
    const data = text.join('\r\n')

    await fileSystem.writeFile(path, data)
    messages.success('Updated /redux/actions/index.js')
  } catch (e) {
    messages.handleError(e, 'updateReducersIndex')
  }
}

const addReducer = async (reducerName, reducerProperty) => {
  const templateData = getTemplateData(reducerName, reducerProperty)
  updateTemplates(templateData)
  await createFolders(templateData)
  await addTemplates(templateData)
  await updateActionsIndex(templateData)
  await updateReducersIndex(templateData)
}

module.exports = {
  addReducer
}
