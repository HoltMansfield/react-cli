import { renderHook } from 'react-hooks-testing-library'


// testdoubles go here

// always REQUIRE in module under test LAST so it gets the testdoubles
const { <%= hookName %> } = require('./<%= hookName %>')


afterEach(() => {
  td.reset() // resets all test doubles
})

test('someFunction returns expected value', () => {
  // render the hook in an unseen component
  const { result } = renderHook(() => <%= hookName %>())

  const actual = result.current.someFunction()

  // assert that our intial value is as expected
  expect(actual).toEqual('')
})
