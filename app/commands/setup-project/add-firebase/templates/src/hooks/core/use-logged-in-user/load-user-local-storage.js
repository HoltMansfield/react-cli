import * as actions from 'redux/actions'
import { getSecureConfig } from 'config/secure'


const setLoggedInUser = (store, newLoggedInUser) => {
  store.dispatch(actions.foundation.setLoggedInUser(newLoggedInUser))
}

export const loadUserFromLocalStorage = (store) => {
  /*
    The router loads before firebase knows if the user is logged in
    so AuthorizedRouter will bounce the user to login
    This is a simple workaround to give the user the ability to hit an AuthorizedRoute
    if they were previously logged in
    Then useFirebaseAuthState will either allow them to remain on the AuthorizedRoute
    or they will be bounced to the login page if their session is actually expired
  */
  const secureConfig = getSecureConfig()
  const url = secureConfig.databaseURL.replace('https://', '')
  const key = `firebase:host:${url}`
  const user = localStorage.getItem(key)

  if (user) {
    setLoggedInUser(store, {})
  }
}
