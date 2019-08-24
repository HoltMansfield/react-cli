/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useEffect } from 'react'
import { useRouteState } from 'hooks/core/use-route-state/useRouteState'
import { FullPageForm } from 'components'
import { useFirebaseUserAdmin } from 'hooks/core/firebase/use-firebase-user-admin/useFirebaseUserAdmin'
import { ForgotPasswordForm } from './forgot-password-form/ForgotPasswordForm'


export default function ForgotPassword () {
  const { setRouteState } = useRouteState()
  const { forgotPassword } = useFirebaseUserAdmin()

  useEffect(() => {
    // set or clear all state for this route here (we need to clear it even if we're not using it)
    setRouteState({})
  },[])

  const onSubmit = (email) => {
    forgotPassword(email)
  }

  return (
    <FullPageForm>
      <ForgotPasswordForm onSubmit={onSubmit} />
    </FullPageForm>
  )
}
