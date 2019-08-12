const rek = require('rekuire')
const { addRoute } = rek('add-route')
const { addReducer } = rek('add-reducer')
const { addReducerProperty } = rek('add-reducer-property')
const { addHook } = rek('add-hook')
const { addForm } = rek('add-form')
const { addReduxHook } = rek('add-redux-hook')
const { addComponent } = rek('add-component')
const { addSimpleComponent } = rek('add-simple-component')


const addInProjectCommands = (program) => {
  program
    .command('add-route <url>')
    .description('Create a route and a routed component')
    .action((url) => addRoute(url))

  program
    .command('add-reducer <reducerName> [reducerValue]')
    .description('Create a reducer and actions')
    .action((reducerName, reducerValue) => addReducer(reducerName, reducerValue))

  program
    .command('add-reducer-property <reducerName> <reducerProperty>')
    .description('Add a reducer property and action to existing reducer and actions')
    .action((reducerName, reducerProperty) => addReducerProperty(reducerName, reducerProperty))

  program
    .command('add-hook <hookName>')
    .description('Create an empty hook and unit test')
    .action((hookName) => addHook(hookName))

  program
    .command('add-form <formName>')
    .description('Create a form based on JSON specification')
    .action((formName) => addForm(formName))

  program
    .command('add-redux-hook <hookName> <reducerName> <reducerProperty>')
    .description('Create a hook that reads from and writes to redux')
    .action((hookName, reducerName, reducerProperty) => {
      return addReduxHook(hookName, reducerName, reducerProperty)
    })

  program
    .command('add-component <componentName>')
    .description('Create a component with a companion hook and styled components')
    .action((componentName) => {
      return addComponent(componentName)
    })

  program
    .command('add-simple-component <componentName>')
    .description('Create a simple component with styled components')
    .action((componentName) => {
      return addSimpleComponent(componentName)
    })

  return program
}

module.exports = {
  addInProjectCommands
}
