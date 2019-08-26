const rek = require('rekuire')
const { fbAddCollection } = rek('fb-add-use-collection')
const { fbAddCreate } = rek('fb-add-create')
const { fbAddCreateRoute } = rek('fb-add-create-route')

const addFirebaseCommands = (program) => {
  program
    .command('fb-add-use-collection <collectionName> <searchProperty>')
    .description('Create a repository-like custom hook for a given firebase collection')
    .action((collectionName, searchProperty) => fbAddCollection(collectionName, searchProperty))

  program
    .command('fb-add-create <collectionName>')
    .description('Create a dumb form and smart component for creating a document in a firebase collection')
    .action((collectionName) => fbAddCreate(collectionName))

  program
    .command('fb-add-create-route <collectionName>')
    .description('Create a route, dumb form and smart component for creating a document in a firebase collection')
    .action((collectionName) => fbAddCreateRoute(collectionName))

  return program
}

module.exports = {
  addFirebaseCommands
}
