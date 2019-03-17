import { renderHook, cleanup, act } from 'react-hooks-testing-library'


// pull td off the global object
const td = global.td

// create test doubles
const expectedRouterContext = { prop: 'Lorem' }
const expectedContextValue = { history: { prop: 'Ipsum' } }
const routerDouble = {
  __RouterContext: expectedRouterContext
}
td.replace('react-router', routerDouble)
const reactDouble = td.replace('react')

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useRouter } = require('./useRouter')

afterEach(() => {
  td.reset() // resets all test doubles
  cleanup() // Unmounts any React trees that were mounted with renderHook
})

test('returns history object from the router context', () => {
  // when our expected context is passed, return the current context value
  td.when(reactDouble.useContext(expectedRouterContext))
    .thenReturn(expectedContextValue)

  // render the hook in an unseen component
  const { result } = renderHook(() => useRouter())

  // now we can test the return values from the hook
  expect(result.current.history).toEqual(expectedContextValue.history)
})
