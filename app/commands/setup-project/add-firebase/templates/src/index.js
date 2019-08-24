import React from 'react'
import ReactDOM from 'react-dom'
import { FoundationApp } from './components/app/FoundationApp'
import { store } from './redux/create-store'
import { SubstateProvider } from 'use-substate'
import { FirebaseProvider } from 'components/core/firebase/FirebaseProvider'
import { loadUserFromLocalStorage } from 'hooks/core/use-logged-in-user/load-user-local-storage'


// first we load the user so we don't have an authorized route trying to load before we have a user
loadUserFromLocalStorage(store)

const rootElement = document.getElementById('root')

const RootComponent = () => (
  <SubstateProvider value={store}>
    <FirebaseProvider>
      <FoundationApp/>
    </FirebaseProvider>
  </SubstateProvider>
)

ReactDOM.render(<RootComponent />, rootElement)
