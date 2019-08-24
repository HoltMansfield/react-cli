import { useSubstate } from 'use-substate'
import * as actions from 'redux/actions'


export const useUserProfile = () => {
  const [userProfile, dispatch] = useSubstate(state => {
    return state.firebase.userProfile
  })

  const setUserProfile = (newUserProfile) => {
    dispatch(actions.firebase.setUserProfile(newUserProfile))
  }

  return {
    userProfile,
    setUserProfile
  }
}
