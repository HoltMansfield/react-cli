import { renderHook, cleanup } from 'react-hooks-testing-library'


// pull td off the global object
const td = global.td

// setup test doubles
const expectedPrimaryColor = 'blue'
const themeDouble = {
  themeObject: {
    palette: {
      primary: {
        main: expectedPrimaryColor
      }
    }
  }
}
td.replace('hooks/core/use-theme/theme', themeDouble)
const materialDouble = {
  createMuiTheme: td.func()
}

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useStyledComponentsTheme } = require('./useStyledComponentsTheme')

afterEach(() => {
  // Unmounts any React trees that were mounted with renderHook
  cleanup()
  // reset all test doubles
  td.reset()
})

test('maps material-ui theme to styled-system specification', () => {
  const expectedResult = { prop: 'value'}

  // render the hook in an unseen component
  const { result } = renderHook(() => useStyledComponentsTheme())

  expect(result.current.styledComponentsTheme.colors.primary).toEqual(expectedPrimaryColor)
})
