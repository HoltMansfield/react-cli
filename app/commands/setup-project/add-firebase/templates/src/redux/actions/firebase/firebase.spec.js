import * as actions from '../'


test('should create the expected setUserProfile action', () => {
  const expectedValue = {}
  const expectedAction = {
    type: 'SET_USER_PROFILE',
    userProfile: expectedValue
  }
  // execute our action creator
  const action = actions.firebase.setUserProfile(expectedValue)

  // assert that our action creator creates the expected action
  expect(action).toEqual(expectedAction)
})
