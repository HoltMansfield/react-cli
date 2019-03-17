import moment from 'moment'
import * as actions from 'redux/actions'


const tokenIsExpired = () => {
  const expiresAt = localStorage.getItem('id_token_expiresAt')
  if (expiresAt) {
    if (moment.utc().diff(moment.unix(expiresAt)) >= 0) {
      return true
    }
  }
  return false
}

const setLoggedInUser = (store, newLoggedInUser) => {
  store.dispatch(actions.foundation.setLoggedInUser(newLoggedInUser))
}

export const loadUserFromLocalStorage = (store) => {
  const user = localStorage.getItem('profile')

  if (user) {
    if (tokenIsExpired()) {
      setLoggedInUser(store, null)
    } else {
      const json = JSON.parse(user)
      setLoggedInUser(store, json)
    }
  }
}
