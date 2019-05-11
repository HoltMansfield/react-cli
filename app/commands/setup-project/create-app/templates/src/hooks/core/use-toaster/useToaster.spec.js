import { renderHook, cleanup } from 'react-hooks-testing-library'



// testdoubles go here
const error = td.func()
const toastifyDouble = {
  toast: {
    error
  }
}
td.replace('react-toastify', toastifyDouble)

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useToaster } = require('./useToaster')


afterEach(() => {
  td.reset() // resets all test doubles
})

test('returns expected intial value', () => {
  const errorMessage = 'epic-fail'
  // render the hook in an unseen component
  const { result } = renderHook(() => useToaster())

  result.current.error(errorMessage)

  td.verify(toastifyDouble.toast.error(errorMessage))
})
