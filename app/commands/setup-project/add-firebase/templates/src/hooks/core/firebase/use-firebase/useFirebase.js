import { useContext } from 'react'
import { FirebaseContext } from 'components/core/firebase/FirebaseProvider'


export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  const { app, auth, db } = context || {}

  return {
    app, auth, db
  }
}
