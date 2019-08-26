const fs = require('fs')
const rek = require('rekuire')
const messages = rek('console-messages')


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
  verifyUseCollection
}
