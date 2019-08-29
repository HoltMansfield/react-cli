import { renderHook } from 'react-hooks-testing-library'


const useSubstateDouble = td.replace('use-substate')
const actionsDouble = { <%= reducerName %>: { <%= actionCreator %>: td.func() } }
td.replace('redux/actions', actionsDouble)

// always REQUIRE in module under test LAST so it gets the testdoubles
const { <%= hookName %> } = require('./<%= hookName %>')


afterEach(() => {
  td.reset() // resets all test doubles
  
})

test('<%= reducerProperty %> contains expected value from state', () => {
  const expectedValue = 'mock-value'
  const state = {
    <%= reducerName %>: {
      <%= reducerProperty %>: expectedValue
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
  const { result } = renderHook(() => <%= hookName %>())

  // captor has a reference to the selectSubstate, so we invoke it with expected state
  const actualSubState = captor.value(state)
  // asser the selectSubstate function selects the correct sub-state
  expect(actualSubState).toEqual(expectedValue)

  // now we can test the return values from the hook
  expect(result.current.<%= reducerProperty %>).toBe(expectedValue)
})

test('<%= actionCreator %> dispatches an action into the store', () => {
  const dispatch = td.func()
  const useSubstateResponse = [
    'value',
    dispatch
  ]
  const new<%= reducerPropertyPascalCase %> = 'updated-value'
  const expectedActionCreator = 'mock-fn-value'

  td.when(useSubstateDouble.useSubstate(td.matchers.anything()))
    .thenReturn(useSubstateResponse)

  td.when(actionsDouble.<%= reducerName %>.<%= actionCreator %>(td.matchers.anything()))
    .thenReturn(expectedActionCreator)

  // render the hook in an unseen component
  const { result } = renderHook(() => <%= hookName %>())

  // invoke the setter function
  result.current.<%= actionCreator %>(new<%= reducerPropertyPascalCase %>)

  // ensure we dispatched an action into the store
  td.verify(dispatch(expectedActionCreator))
})
