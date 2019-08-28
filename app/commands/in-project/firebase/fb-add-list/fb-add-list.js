/* eslint max-len: "off" */
const rek = require('rekuire')
const _ = require('lodash')
const pluralize = require('pluralize')
const projectPaths = rek('project-paths')
const messages = rek('console-messages')
const fileSystem = rek('file-system')
let templates = require('./templates/templates.json')
const strings = rek('strings')
const { addFirebaseForm } = rek('add-form')
const { verifyUseCollection, checkForFirebaseCollectionDefinition } = rek('fb-verify')

const root = projectPaths.getProjectRoot(__dirname)
const seperator = projectPaths.getSeparator()


const getTemplateData = (collectionName) => {
  return {
    collectionName: pluralize(collectionName),
    collectionNamePascalCase: strings.capitalizeFirstLetter(pluralize(collectionName)),
    collectionNameSnakeCase: strings.mapToSnakeCase(pluralize(collectionName)),
    collectionNameSingular: collectionName,
    collectionNameSingularPascalCase: strings.capitalizeFirstLetter(collectionName)
  }
}

const updateTemplates = (templateData) => {
  // lodash templates choked on using JSON so I'm doing this 1 file manually
  templates = JSON.stringify(templates, null, 2)
  templates = templates.replace(/<%= collectionNameSnakeCase %>/g, templateData.collectionNameSnakeCase)
  templates = templates.replace(/<%= collectionNamePascalCase %>/g, templateData.collectionNamePascalCase)
  templates = templates.replace(/<%= collectionNameSingularPascalCase %>/g, templateData.collectionNameSingularPascalCase)

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
    await fileSystem.makeDirectory(`${root}/src/components/firebase/collections/${templateData.collectionName}/list`)
  } catch (e) {
    messages.handleError(e, 'createFolders')
  }
}

const getHeaderContent = (collectionSchema, templateData) => {
  const { collectionNameSingular } = templateData
  // start the table
  const headerContent = [`\t\t\t<TableRow key='${collectionNameSingular}Header'>`]

  // one column for each field
  Object.keys(collectionSchema).forEach(function(key) {
    headerContent.push(`\t\t\t\t<TableCell>${strings.mapToLabel(key)}</TableCell>`)
  })

  // end the table
  headerContent.push('\t\t\t</TableRow>')
  return  headerContent.join('\r\n')
}

const getBodyContent = (collectionSchema, templateData) => {
  const { collectionNameSingular } = templateData
  // start the table
  const bodyContent = [`\t\t\t<TableRow key={${collectionNameSingular}.id} hover={true} onClick={event => handleSelect(event, ${collectionNameSingular}.id)}>`]

  // one column for each field
  Object.keys(collectionSchema).forEach(function(key) {
    bodyContent.push(`\t\t\t\t<TableCell>{${collectionNameSingular}.${key}}</TableCell>`)
  })

  // end the table
  bodyContent.push('\t\t\t</TableRow>')
  return bodyContent.join('\r\n')
}

const buildListCollection = async (templateData, collectionSchema) => {
  try {
    const { collectionNamePascalCase } = templateData
    const path = `${__dirname}/templates/new-list-component-dumb.jsx`
    const destinationPath = `${root}/src/components/firebase/collections/${collectionNamePascalCase}/list/List${collectionNamePascalCase}.js`

    // This file needs some manual updates via JS but we still want lodash to compile it
    let templateFileContent = await fileSystem.readFile(path)
    const compiled = _.template(templateFileContent)
    templateFileContent = compiled(templateData)

    // now that it's updated, break it into lines for manual updates like we do in add-form
    const lines = templateFileContent.split('\n').map(line => ({ text: line }))

    const headerContent = getHeaderContent(collectionSchema, templateData)
    fileSystem.insertAtGeneratorTag(lines, '//GeneratorToken: <header-content>', headerContent)

    //messages.json(lines)

    const bodyContent = getBodyContent(collectionSchema, templateData)
    fileSystem.insertAtGeneratorTag(lines, '//GeneratorToken: <body-content>', bodyContent)

    const text = lines.map(line => line.text)
    const data = text.join('\r\n')

    await fileSystem.writeFile(destinationPath, data)
    messages.success(`added List${collectionNamePascalCase}: ${destinationPath}`)
  } catch (e) {
    messages.handleError(e, 'buildListCollection')
  }
}

const fbAddList = async (collectionName) => {
  const templateData = getTemplateData(collectionName)
  const hasUseCollection = verifyUseCollection(root, templateData)
  const collectionSchema = checkForFirebaseCollectionDefinition(root, templateData.collectionName)

  if (hasUseCollection && collectionSchema) {
    updateTemplates(templateData)
    await createFolders(templateData)
    await addTemplates(templateData)
    await buildListCollection(templateData, collectionSchema)
  }
}

module.exports = {
  fbAddList
}
