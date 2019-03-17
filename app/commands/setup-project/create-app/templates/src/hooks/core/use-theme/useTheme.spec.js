import { renderHook, cleanup } from 'react-hooks-testing-library'


// pull td off the global object
const td = global.td

// setup test doubles
const themeDouble = {
  themeObject: { color: 'red' }
}
td.replace('./theme', themeDouble)
const materialDouble = {
  createMuiTheme: td.func()
}
td.replace('@material-ui/core/styles', materialDouble)

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useTheme } = require('./useTheme')

afterEach(() => {
  // Unmounts any React trees that were mounted with renderHook
  cleanup()
  // reset all test doubles
  td.reset()
})

test('reads theme off disk and calls createMuiTheme', () => {
  const expectedResult = { prop: 'value'}

  td.when(materialDouble.createMuiTheme(themeDouble.themeObject))
    .thenReturn(expectedResult)

  // render the hook in an unseen component
  const { result } = renderHook(() => useTheme())

  expect(result.current.theme).toEqual(expectedResult)
})
