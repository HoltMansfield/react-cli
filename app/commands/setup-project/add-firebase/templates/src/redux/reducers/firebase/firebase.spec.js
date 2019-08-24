import { firebase, initialState } from './firebase'
import * as actions from '../../actions'

test('should handle initial state', () => {
  expect(firebase(initialState, {})).toEqual(initialState)
})

test('should set userProfile to new value', () => {
  const newValue = 'new-value'
  const expectedState = {
    ...initialState,
    userProfile: newValue
  }
  // create an action
  const action = actions.firebase.setUserProfile(newValue)
  // test the reducer with an action and an inital state
  const updatedState = firebase(initialState, action)
  // confirm that state was correctly updated
  expect(updatedState).toEqual(expectedState)
})
