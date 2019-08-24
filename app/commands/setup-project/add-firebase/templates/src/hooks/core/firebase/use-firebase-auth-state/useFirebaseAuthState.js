/* eslint react-hooks/exhaustive-deps: "off" */
import { useEffect } from 'react'
import { useFirebase } from 'hooks/core/firebase/use-firebase/useFirebase'
import { useLoggedInUser } from 'hooks/redux/foundation/use-logged-in-user/useLoggedInUser'
import { useUserProfile } from 'hooks/redux/firebase/use-user-profile/useUserProfile'


export const useFirebaseAuthState = () => {
  const { auth, db } = useFirebase()
  const { setLoggedInUser } = useLoggedInUser()
  const { setUserProfile } = useUserProfile()

  const fetchUserProfile = async (id) => {
    try {
      const result = await db.collection('userProfile').doc(id).get()
      const profile = result.data()
      setUserProfile(profile)
    } catch (error) {
      debugger
      //toDo: sentry
    }
  }

  const wireUpAuthStateListener = () => {
    if (!auth) {
      return
    }

    auth.onAuthStateChanged(authUser => {
      setLoggedInUser(authUser)
      if(authUser && authUser.uid) {
        fetchUserProfile(authUser.uid)
      }
    })
  }

  useEffect(() => {
    wireUpAuthStateListener()
  }, [auth])

  const loadAuthState = () => {

  }

  return {
    loadAuthState
  }
}
