import { renderHook } from 'react-hooks-testing-library'


const useSubstateDouble = td.replace('use-substate')
const actionsDouble = { routeState: { setValue: td.func() } }
td.replace('redux/actions', actionsDouble)

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useRouteState } = require('./useRouteState')


afterEach(() => {
  td.reset() // resets all test doubles

})

test('value contains expected value from state', () => {
  const expectedValue = 'mock-value'
  const state = {
    routeState: {
      value: expectedValue
    }
  }
  const dispatch = td.func()
  const useSubstateResponse = [
    expectedValue,
    dispatch
  ]

  // captor will 'capture' the selectSubstate function passed to useSubstate
  const captor = td.matchers.captor()
  td.when(useSubstateDouble.useSubstate(captor.capture()))
    .thenReturn(useSubstateResponse)

  // render the hook in an unseen component
  const { result } = renderHook(() => useRouteState())

  // captor has a reference to the selectSubstate, so we invoke it with expected state
  const actualSubState = captor.value(state)
  // asser the selectSubstate function selects the correct sub-state
  expect(actualSubState).toEqual(expectedValue)

  // now we can test the return values from the hook
  expect(result.current.routeState).toBe(expectedValue)
})

test('setValue dispatches an action into the store', () => {
  const dispatch = td.func()
  const useSubstateResponse = [
    'value',
    dispatch
  ]
  const newValue = 'updated-value'
  const expectedActionCreator = 'mock-fn-value'

  td.when(useSubstateDouble.useSubstate(td.matchers.anything()))
    .thenReturn(useSubstateResponse)

  td.when(actionsDouble.routeState.setValue(td.matchers.anything()))
    .thenReturn(expectedActionCreator)

  // render the hook in an unseen component
  const { result } = renderHook(() => useRouteState())

  // invoke the setter function
  result.current.setRouteState(newValue)

  // ensure we dispatched an action into the store
  td.verify(dispatch(expectedActionCreator))
})
