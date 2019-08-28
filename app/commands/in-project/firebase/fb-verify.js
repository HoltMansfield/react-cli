const fs = require('fs')
const rek = require('rekuire')
const messages = rek('console-messages')


const checkForFirebaseCollectionDefinition = (root, collectionName) => {
  const path = `${root}/src/collections/${collectionName}.js`

  try {
    const schema = require(path)
    return schema
  } catch (e) {
    messages.error(`Missing JSON collection definition at: ${path}`)
    messages.info(`Please see instructions here: ${root}/src/collections/docs/readMe.md`)
  }
}

const verifyUseCollection = (root, collectionTemplateData) => {
  const { collectionNameSingular, collectionNameSnakeCase, collectionNamePascalCase } = collectionTemplateData
  const path = `${root}/src/hooks/core/firebase/collections/use-${collectionNameSnakeCase}/use${collectionNamePascalCase}.js`

  if (!fs.existsSync(path)) {
    const command = `fb-add-use-collection ${collectionNameSingular}`
    messages.error(`Before you can run this command you need to run: ${command}`)

    return false
  }

  return true
}

module.exports = {
  checkForFirebaseCollectionDefinition,
  verifyUseCollection
}
