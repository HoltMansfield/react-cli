import { useSubstate } from 'use-substate'
import { useRouter } from 'hooks/core/use-router/useRouter'
import * as actions from 'redux/actions'


const useLoggedInUser = () => {
  const { history } = useRouter()
  const [loggedInUser, dispatch] = useSubstate(state => {
    return state.foundation.loggedInUser
  })

  const setLoggedInUser = (newLoggedInUser) => {
    dispatch(actions.foundation.setLoggedInUser(newLoggedInUser))
  }

  const logout = () => {
    // clear localstorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('id_token_expiresAt')
    localStorage.removeItem('profile')
    // update redux
    setLoggedInUser(null)
    // bounce to home page
    history.push('/')
  }

  return {
    loggedInUser,
    logout,
    setLoggedInUser
  }
}

export { useLoggedInUser }
