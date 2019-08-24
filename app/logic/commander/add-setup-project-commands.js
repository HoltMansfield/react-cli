const rek = require('rekuire')
const { createApp } = rek('create-app')
const { createFirebaseApp } = rek('create-firebase-app')

// remove
const { addFirebase } = rek('add-firebase')


const addSetupProjectCommands = (program) => {
  program
    .command('create-app <appName>')
    .description('Runs create-react-app then scaffolds out a production application on top')
    .action((appName) => createApp(appName))

  program
    .command('create-firebase-app <appName>')
    .description('Runs create-react-app then scaffolds out a production firebase application on top')
    .action((appName) => createFirebaseApp(appName))

// remove
program
  .command('add-firebase')
  .description('DELETE THIS HOLT')
  .action((appName) => addFirebase('blep'))

  return program
}

module.exports = {
  addSetupProjectCommands
}
