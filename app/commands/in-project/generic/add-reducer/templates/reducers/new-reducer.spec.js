import { <%= reducerName %>, initialState } from './<%= reducerFileName %>'
import * as actions from '../../actions'

test('should handle initial state', () => {
  expect(<%= reducerName %>(initialState, {})).toEqual(initialState)
})

test('should set <%= reducerProperty %> to new value', () => {
  const newValue = 'new-value'
  const expectedState = {
    ...initialState,
    <%= reducerProperty %>: newValue
  }
  // create an action
  const action = actions.<%= reducerName %>.<%= setReducerPropertyFunction %>(newValue)
  // test the reducer with an action and an inital state
  const updatedState = <%= reducerName %>(initialState, action)
  // confirm that state was correctly updated
  expect(updatedState).toEqual(expectedState)
})
