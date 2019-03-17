import { renderHook, cleanup } from 'react-hooks-testing-library'


// testdoubles go here

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useGlobalStyle } = require('./useGlobalStyle')


afterEach(() => {
  //td.reset() // resets all test doubles
  cleanup() // Unmounts any React trees that were mounted with renderHook
})

test('returns expected intial value', () => {
  // render the hook in an unseen component
  const { result } = renderHook(() => useGlobalStyle())

  // assert that our intial value is as expected
  expect(result.current.createGlobalStyleComponent).toBeDefined()
})
