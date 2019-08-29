import * as actions from '../'


test('should create the expected <%= setReducerPropertyFunction %> action', () => {
  const expectedValue = {}
  const expectedAction = {
    type: '<%= actionType %>',
    <%= reducerProperty %>: expectedValue
  }
  // execute our action creator
  const action = actions.<%= reducerName %>.<%= setReducerPropertyFunction %>(expectedValue)

  // assert that our action creator creates the expected action
  expect(action).toEqual(expectedAction)
})
