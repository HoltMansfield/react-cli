const rek = require('rekuire')
const { createApp } = rek('create-app')


const addSetupProjectCommands = (program) => {
  program
    .command('create-app <appName>')
    .description('Runs create-react-app then scaffolds out a production application on top')
    .action((appName) => createApp(appName))

  return program
}

module.exports = {
  addSetupProjectCommands
}
