import { renderHook } from 'react-hooks-testing-library'


// testdoubles go here
const app = {}
const auth = {
  createUserWithEmailAndPassword: td.func()
}
const db = {}
const useFirebaseDouble = {
  useFirebase: () => {
    return {
      app,
      auth,
      db
    }
  }
}
td.replace('../use-firebase/useFirebase', useFirebaseDouble)

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useFirebaseUserAdmin } = require('./useFirebaseUserAdmin')


afterEach(() => {
  td.reset() // resets all test doubles
})

test('createUser returns expected value', async () => {
  const email = 'h@h.com'
  const password = 'phoenix'
  const newUser = { email, password, }
  // render the hook in an unseen component
  const { result } = renderHook(() => useFirebaseUserAdmin())

  td.when(auth.createUserWithEmailAndPassword(email, password))
    .thenResolve(newUser)

  const actual = await result.current.createUser(email, password)

  // assert that our intial value is as expected
  expect(actual).toEqual(newUser)
})
