/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useEffect } from 'react'
import { useRouteState } from 'hooks/core/use-route-state/useRouteState'
import { useFirebaseUserAdmin } from 'hooks/core/firebase/use-firebase-user-admin/useFirebaseUserAdmin'
import { FullPageForm } from 'components'
import { LoginForm } from './login-form/LoginForm'


export default function Login ({ history }) {
  const { setRouteState } = useRouteState()
  const { login } = useFirebaseUserAdmin()

  useEffect(() => {
    // set or clear all state for this route here (we need to clear it even if we're not using it)
    setRouteState({})
  },[])

  const onSubmit = (loginAttempt) => {
    const result = login(loginAttempt)
    if(result) {
      history.push('/')
    }
  }

  return (
    <FullPageForm>
      <LoginForm onSubmit={onSubmit} />
    </FullPageForm>
  )
}
