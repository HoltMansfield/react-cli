import { renderHook, cleanup } from 'react-hooks-testing-library'


const useSubstateDouble = td.replace('use-substate')
const raeDouble = td.replace('@dol/react-app-essentials')

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useSelectedLanguage } = require('./useSelectedLanguage')

afterEach(() => {
  td.reset() // resets all test doubles
  cleanup() // Unmounts any React trees that were mounted with renderHook
})

test('selectedLanguage contains expected value from state', () => {
  const state = {
    foundation: {
      selectedLanguage: 'en'
    }
  }
  const dispatch = td.func()
  const useSubstateResponse = [
    'en',
    dispatch
  ]

  // captor will 'capture' the selectSubstate function passed to useSubstate
  const captor = td.matchers.captor()
  td.when(useSubstateDouble.useSubstate(captor.capture()))
    .thenReturn(useSubstateResponse)

  // render the hook in an unseen component
  const { result } = renderHook(() => useSelectedLanguage())

  // captor has a reference to the selectSubstate, so we invoke it with expected state
  const actualSubState = captor.value(state)
  // asser the selectSubstate function selectes teh correct sub-state
  expect(actualSubState).toEqual('en')

  // now we can test the return values from the hook
  expect(result.current.selectedLanguage).toBe('en')
})

test('setSelectedLanguage dispatches an action into the store', () => {
  const dispatch = td.func()
  const useSubstateResponse = [
    'en',
    dispatch
  ]
  const newSelectedLanguage = 'fr'
  const expectedActionCreator = 'mock-fn-value'

  td.when(useSubstateDouble.useSubstate(td.matchers.anything()))
    .thenReturn(useSubstateResponse)

  td.when(raeDouble.foundationActions.setSelectedLanguage(td.matchers.anything()))
    .thenReturn(expectedActionCreator)

  // render the hook in an unseen component
  const { result } = renderHook(() => useSelectedLanguage())

  // invoke the setter function
  result.current.setSelectedLanguage(newSelectedLanguage)

  // ensure we dispatched an action into the store
  td.verify(dispatch(expectedActionCreator))
})
