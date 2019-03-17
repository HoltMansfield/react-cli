const rek = require('rekuire')
const { addRoute } = rek('add-route')
const { addReducer } = rek('add-reducer')
const { addReducerValue } = rek('add-reducer-value')
const { addHook } = rek('add-hook')
const { addReduxHook } = rek('add-redux-hook')
const { addComponent } = rek('add-component')
const { addSimpleComponent } = rek('add-simple-component')


const addWebAppCommands = (program) => {
  program
    .command('add-route <url>')
    .description('Create a route and a routed component')
    .action((url) => addRoute(url))

  program
    .command('add-reducer <reducerName> [reducerValue]')
    .description('Create a reducer and actions')
    .action((reducerName, reducerValue) => addReducer(reducerName, reducerValue))

  program
    .command('add-reducer-value <reducerName> <reducerValue>')
    .description('Add a reducer value and action to existing reducer and actions')
    .action((reducerName, reducerValue) => addReducerValue(reducerName, reducerValue))

  program
    .command('add-hook <hookName>')
    .description('Create an empty hook and unit test')
    .action((hookName) => addHook(hookName))

  program
    .command('add-redux-hook <hookName> <reducerName> <reducerProperty> <actionCreator>')
    .description('Create a hook that reads from and writes to redux')
    .action((hookName, reducerName, reducerProperty, actionCreator) => {
      return addReduxHook(hookName, reducerName, reducerProperty, actionCreator)
    })

  program
    .command('add-component <componentName>')
    .description('Create a component with a companion hook and styled components')
    .action((componentName) => {
      return addComponent(componentName)
    })

  program
    .command('add-simple-component <componentName>')
    .description('Create a simple component with a companion hook and styled components')
    .action((componentName) => {
      return addSimpleComponent(componentName)
    })




  return program
}

module.exports = {
  addWebAppCommands
}
