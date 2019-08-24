import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useLoggedInUser } from 'hooks/core/use-logged-in-user/useLoggedInUser'


export function AuthorizedRoute ({ component: Component, ...rest }) {
  const { loggedInUser } = useLoggedInUser()

  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedInUser != null
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}}
    />
  )
}
