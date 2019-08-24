/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useEffect } from 'react'
import { FullPageForm } from 'components'
import { useRouteState } from 'hooks/core/use-route-state/useRouteState'
import { useFirebaseUserAdmin } from 'hooks/core/firebase/use-firebase-user-admin/useFirebaseUserAdmin'
import { ChangePasswordForm } from './change-password-form/ChangePasswordForm'



export default function ChangePassword () {
  const { setRouteState } = useRouteState()
  const { changePassword } = useFirebaseUserAdmin()

  useEffect(() => {
    // set or clear all state for this route here (we need to clear it even if we're not using it)
    setRouteState({})
  },[])

  const onSubmit = (newPassword) => {
    changePassword(newPassword)
  }

  return (
    <FullPageForm>
      <ChangePasswordForm onSubmit={onSubmit} />
    </FullPageForm>
  )
}
