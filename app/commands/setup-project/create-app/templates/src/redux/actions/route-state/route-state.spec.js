import * as actions from '../'


test('should create the expected setValue action', () => {
  const expectedValue = {}
  const expectedAction = {
    type: 'SET_VALUE',
    value: expectedValue
  }
  // execute our action creator
  const action = actions.routeState.setValue(expectedValue)

  // assert that our action creator creates the expected action
  expect(action).toEqual(expectedAction)
})
