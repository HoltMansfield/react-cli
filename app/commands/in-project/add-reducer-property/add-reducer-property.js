/* eslint max-len: "off" */
const rek = require('rekuire')
const strings = rek('strings')
const messages = rek('messages')
const projectPaths = rek('project-paths')
const fileSystem = rek('file-system')


const root = projectPaths.getProjectRoot(__dirname)
const seperator = projectPaths.getSeparator()


const getTemplateData = (reducerName, reducerProperty) => {
  const reducerPropertyPascalCase = strings.capitalizeFirstLetter(reducerProperty)
  const actionType = `SET_${strings.mapToUnderbarsAllCaps(reducerProperty)}`

  return {
    reducerName,
    reducerFileName: strings.mapToSnakeCase(reducerName),
    reducerProperty,
    reducerPropertyPascalCase,
    setReducerPropertyFunction: `set${reducerPropertyPascalCase}`,
    actionType
  }
}

// find the line where we want to insert the new actionType
const tagIndexOfNewActionType = (lines) => {
  const closingBrace = '})'
  const indexOf = lines.findIndex(line => {
    const found = line.text.trim() === closingBrace
    return found > 0
  })

  //we actually want the line above the closingBrace so we subtract 1
  lines[indexOf - 1].tag = 'new-action-type'
}

const updateReducer = async (templateData) => {
  const reducerFileName = templateData.reducerFileName
  const reducerPath = `${root}${seperator}src${seperator}redux${seperator}reducers${seperator}${reducerFileName}${seperator}${reducerFileName}.js`
  const lines = await fileSystem.getLines(reducerPath)

  tagIndexOfNewActionType(lines)

  const newActionType =
  `      case '${templateData.actionType}':
        draft.${templateData.reducerProperty} = action.${templateData.reducerProperty}
        return`
  fileSystem.insertAtTag(lines, 'new-action-type', newActionType)

  const text = lines.map(line => line.text)
  const data = text.join('\r\n')

  await fileSystem.writeFile(reducerPath, data)
  messages.success(`Updated ${reducerPath}`)
}

// find the line where we want to insert the new actionType
const tagIndexOfNewActionTypeTest = (lines) => {
  lines.push({
    tag: '* blank-line *',
    text: ''
  })
  lines.push({
    tag: 'new-action-type-test',
    text: ''
  })
}

const updateReducerTest = async (templateData) => {
  const reducerFileName = templateData.reducerFileName
  const reducerTestPath = `${root}${seperator}src${seperator}redux${seperator}reducers${seperator}${reducerFileName}${seperator}${reducerFileName}.spec.js`
  const lines = await fileSystem.getLines(reducerTestPath)

  tagIndexOfNewActionTypeTest(lines)

  const newActionTypeTest =
  `test('should set ${templateData.reducerProperty} to new value', () => {
  const newValue = 'new-value'
  const expectedState = {
    ...initialState,
    ${templateData.reducerProperty}: newValue
  }
  // create an action
  const action = actions.${templateData.reducerName}.${templateData.setReducerPropertyFunction}(newValue)
  // test the reducer with an action and an inital state
  const updatedState = ${templateData.reducerName}(initialState, action)
  // confirm that state was correctly updated
  expect(updatedState).toEqual(expectedState)
})`

  fileSystem.insertAtTag(lines, 'new-action-type-test', newActionTypeTest)

  const text = lines.map(line => line.text)
  const data = text.join('\r\n')

  await fileSystem.writeFile(reducerTestPath, data)
  messages.success(`Updated ${reducerTestPath}`)
}

// find the line where we want to insert the new action creator
const tagIndexOfNewActionCreator = (lines) => {
  lines.push({
    tag: '* blank-line *',
    text: ''
  })
  lines.push({
    tag: 'new-action-creator',
    text: ''
  })
}

const updateActionCreators = async (templateData) => {
  const reducerFileName = templateData.reducerFileName
  const actionCreatorsPath = `${root}${seperator}src${seperator}redux${seperator}actions${seperator}${reducerFileName}${seperator}${reducerFileName}.js`
  const lines = await fileSystem.getLines(actionCreatorsPath)

  tagIndexOfNewActionCreator(lines)

  const newActionCreator =
  `export const ${templateData.setReducerPropertyFunction } = ${templateData.reducerProperty} => (
  {
    type: '${templateData.actionType}',
    ${templateData.reducerProperty}
  }
)`

  fileSystem.insertAtTag(lines, 'new-action-creator', newActionCreator)

  const text = lines.map(line => line.text)
  const data = text.join('\r\n')

  await fileSystem.writeFile(actionCreatorsPath, data)
  messages.success(`Updated ${actionCreatorsPath}`)
}

// find the line where we want to insert the new action creator test
const tagIndexOfNewActionCreatorTest = (lines) => {
  lines.push({
    tag: '* blank-line *',
    text: ''
  })
  lines.push({
    tag: 'new-action-creator-test',
    text: ''
  })
}

const updateActionCreatorsTest = async (templateData) => {
  const reducerFileName = templateData.reducerFileName
  const actionCreatorsTestPath = `${root}${seperator}src${seperator}redux${seperator}actions${seperator}${reducerFileName}${seperator}${reducerFileName}.spec.js`
  const lines = await fileSystem.getLines(actionCreatorsTestPath)

  tagIndexOfNewActionCreatorTest(lines)

  const newActionCreatorTest =
  `test('should create the expected ${templateData.setReducerPropertyFunction } action', () => {
  const expectedValue = {}
  const expectedAction = {
    type: '${templateData.actionType}',
    ${templateData.reducerProperty}: expectedValue
  }
  // execute our action creator
  const action = actions.${templateData.reducerName}.${templateData.setReducerPropertyFunction}(expectedValue)

  // assert that our action creator creates the expected action
  expect(action).toEqual(expectedAction)
})`

  fileSystem.insertAtTag(lines, 'new-action-creator-test', newActionCreatorTest)

  const text = lines.map(line => line.text)
  const data = text.join('\r\n')

  await fileSystem.writeFile(actionCreatorsTestPath, data)
  messages.success(`Updated ${actionCreatorsTestPath}`)
}

const addReducerProperty = async (reducerName, reducerProperty) => {
  try {
    const templateData = getTemplateData(reducerName, reducerProperty)
    await updateReducer(templateData)
    await updateReducerTest(templateData)
    await updateActionCreators(templateData)
    await updateActionCreatorsTest(templateData)
  } catch (e) {
    messages.handleError(e, 'updateRouteTable')
  }
}

module.exports = {
  addReducerProperty
}
