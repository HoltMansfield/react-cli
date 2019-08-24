/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useState, useEffect } from 'react'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { getSecureConfig } from 'config/secure'


const FirebaseContext = React.createContext(null)

function FirebaseProvider ({ children }) {
  const [firebase, setFirebase] = useState(null)
  const {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId
  } = getSecureConfig()
  const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId
  }

  useEffect(() => {
    app.initializeApp(firebaseConfig)
    const auth = app.auth()
    const db = app.firestore()
    setFirebase({ app, auth, db })
  },[])

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

export { FirebaseProvider, FirebaseContext }
