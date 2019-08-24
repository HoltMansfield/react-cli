/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useEffect } from 'react'
import { useFirebaseUserAdmin } from 'hooks/core/firebase/use-firebase-user-admin/useFirebaseUserAdmin'
import { useRouteState } from 'hooks/core/use-route-state/useRouteState'
import { FullPageForm } from 'components'
import { CreateAccountForm } from './create-account-form/CreateAccountForm'


export default function CreateAccount ({ history }) {
  const { setRouteState } = useRouteState()
  const { createUser } = useFirebaseUserAdmin()

  useEffect(() => {
    setRouteState({})
  },[])

  const onSubmit = async (newUserData) => {
    const result = await createUser(newUserData.email, newUserData.password)
    if(result) {
      history.push('/')
    }
  }

  return (
    <FullPageForm>
      <CreateAccountForm onSubmit={onSubmit} />
    </FullPageForm>
  )
}
