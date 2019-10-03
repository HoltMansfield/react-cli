const rek = require('rekuire')
const { fbAddUseCollection } = rek('fb-add-use-collection')
const { fbAddCreateRoute } = rek('fb-add-create-route')
const { fbAddDetailsRoute } = rek('fb-add-details-route')
const { fbAddEditRoute } = rek('fb-add-edit-route')
const { fbAddListRoute } = rek('fb-add-list-route')


const fbAddCollection = async (collectionName, searchProperty) => {
  await fbAddUseCollection(collectionName, searchProperty)
  await fbAddCreateRoute(collectionName)
  await fbAddDetailsRoute(collectionName)
  await fbAddEditRoute(collectionName)
  await fbAddListRoute(collectionName)
}

module.exports = {
  fbAddCollection
}
