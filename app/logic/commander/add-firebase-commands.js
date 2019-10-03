const rek = require('rekuire')
const { fbAddUseCollection } = rek('fb-add-use-collection')
const { fbAddCreate } = rek('fb-add-create')
const { fbAddCreateRoute } = rek('fb-add-create-route')
const { fbAddList } = rek('fb-add-list')
const { fbAddListRoute } = rek('fb-add-list-route')
const { fbAddDetails } = rek('fb-add-details')
const { fbAddDetailsRoute } = rek('fb-add-details-route')
const { fbAddEdit } = rek('fb-add-edit')
const { fbAddEditRoute } = rek('fb-add-edit-route')
const { fbAddCollection } = rek('fb-add-collection')


const addFirebaseCommands = (program) => {
  program
    .command('fb-add-use-collection <collectionName> <searchProperty>')
    .description('Create a repository-like custom hook for a given firebase collection')
    .action((collectionName, searchProperty) => fbAddUseCollection(collectionName, searchProperty))

  program
    .command('fb-add-create <collectionName>')
    .description('Create a dumb form and smart component for creating a document in a firebase collection')
    .action((collectionName) => fbAddCreate(collectionName))

  program
    .command('fb-add-create-route <collectionName>')
    .description('Create a route, dumb form and smart component for creating a document in a firebase collection')
    .action((collectionName) => fbAddCreateRoute(collectionName))

  program
    .command('fb-add-list <collectionName>')
    .description('Create components for listing documents in a firebase collection')
    .action((collectionName) => fbAddList(collectionName))

  program
    .command('fb-add-list-route <collectionName>')
    .description('Create a route, and components for listing documents in a firebase collection')
    .action((collectionName) => fbAddListRoute(collectionName))

  program
    .command('fb-add-details <collectionName>')
    .description('Create components for rendering a document from a firebase collection')
    .action((collectionName) => fbAddDetails(collectionName))

  program
    .command('fb-add-details-route <collectionName>')
    .description('Create a route, and components for rendering a document from a firebase collection')
    .action((collectionName) => fbAddDetailsRoute(collectionName))

  program
    .command('fb-add-edit <collectionName>')
    .description('Create components for rendering a document from a firebase collection')
    .action((collectionName) => fbAddEdit(collectionName))

  program
    .command('fb-add-edit-route <collectionName>')
    .description('Create a route, and components for editing a document from a firebase collection')
    .action((collectionName) => fbAddEditRoute(collectionName))

  program
    .command('fb-add-edit-route <collectionName>')
    .description('Create a route, and components for editing a document from a firebase collection')
    .action((collectionName) => fbAddEditRoute(collectionName))

  program
    .command('fb-add-collection <collectionName> <searchProperty>')
    .description('Create create, details, edit, list routes and components for a firebase collection')
    .action((collectionName, searchProperty) => fbAddCollection(collectionName, searchProperty))

  return program
}

module.exports = {
  addFirebaseCommands
}
