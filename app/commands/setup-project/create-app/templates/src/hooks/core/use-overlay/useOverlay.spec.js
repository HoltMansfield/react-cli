import { renderHook, cleanup } from 'react-hooks-testing-library'


const useSubstateDouble = td.replace('use-substate')
const raeDouble = td.replace('@dol/react-app-essentials')

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useOverlay } = require('./useOverlay')


afterEach(() => {
  td.reset() // resets all test doubles
  cleanup() // Unmounts any React trees that were mounted with renderHook
})

test('showOverlay contains expected value from state', () => {
  const expectedValue = 'mock-value'
  const state = {
    foundation: {
      showOverlay: expectedValue
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
  const { result } = renderHook(() => useOverlay())

  // captor has a reference to the selectSubstate, so we invoke it with expected state
  const actualSubState = captor.value(state)
  // asser the selectSubstate function selects the correct sub-state
  expect(actualSubState).toEqual(expectedValue)

  // now we can test the return values from the hook
  expect(result.current.showOverlay).toBe(expectedValue)
})

test('setShowOverlay dispatches an action into the store', () => {
  const dispatch = td.func()
  const useSubstateResponse = [
    'en',
    dispatch
  ]
  const newFoundation = 'updated-value'
  const expectedActionCreator = 'mock-fn-value'

  td.when(useSubstateDouble.useSubstate(td.matchers.anything()))
    .thenReturn(useSubstateResponse)

  td.when(raeDouble.foundationActions.setShowOverlay(td.matchers.anything()))
    .thenReturn(expectedActionCreator)

  // render the hook in an unseen component
  const { result } = renderHook(() => useOverlay())

  // invoke the setter function
  result.current.setShowOverlay(newFoundation)

  // ensure we dispatched an action into the store
  td.verify(dispatch(expectedActionCreator))
})
