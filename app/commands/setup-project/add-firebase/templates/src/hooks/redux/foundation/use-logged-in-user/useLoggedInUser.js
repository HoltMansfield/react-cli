import { useSubstate } from 'use-substate'
import * as actions from 'redux/actions'


export const useLoggedInUser = () => {
  const [loggedInUser, dispatch] = useSubstate(state => {
    return state.foundation.loggedInUser
  })

  const setLoggedInUser = (newLoggedInUser) => {
    dispatch(actions.foundation.setLoggedInUser(newLoggedInUser))
  }

  return {
    loggedInUser,
    setLoggedInUser
  }
}
