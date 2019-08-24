import { routeState } from './route-state'
import * as actions from '../../actions'


test('should set value to new value', () => {
  const initialState = { value: { a: 1, b: 2 } }
  const newValue = { a: 2 }
  const expectedState = { value: { a: 2, b: 2 } }

  // create an action
  const action = actions.routeState.setValue(newValue)
  // test the reducer with an action and an inital state
  const updatedState = routeState(initialState, action)
  // confirm that state was correctly updated
  expect(updatedState).toEqual(expectedState)
})
