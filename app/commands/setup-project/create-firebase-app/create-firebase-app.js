const rek = require('rekuire')
const { createApp } = rek('create-app')
const { addFirebase } = rek('add-firebase')
const messages = rek('console-messages')


const createFirebaseApp = async (appName) => {
  try {
    // first we call the base application generator
    await createApp(appName)
    messages.info('**** createApp is complete, about to add firebase ****')
    // then we add firebase code and dependencies
    await addFirebase(appName)
  } catch (e) {
    messages.handleError(e, 'createFirebaseApp')
  }
}

module.exports = {
  createFirebaseApp
}
