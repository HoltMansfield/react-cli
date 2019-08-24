const rek = require('rekuire')
const { fbAddCollection } = rek('fb-add-collection')
const { fbAddCreate } = rek('fb-add-create')


const addFirebaseCommands = (program) => {
  program
    .command('fb-add-collection <collectionName> <searchProperty>')
    .description('Create a repository-like custom hook for a given firebase collection')
    .action((collectionName, searchProperty) => fbAddCollection(collectionName, searchProperty))

  program
    .command('fb-add-create <collectionName>')
    .description('Create a repository-like custom hook for a given firebase collection')
    .action((collectionName) => fbAddCreate(collectionName))

  return program
}

module.exports = {
  addFirebaseCommands
}
