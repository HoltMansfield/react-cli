import React, { useEffect } from 'react'
import Auth0 from 'auth0-js'


const isAuthZeroRedirect = () => {
  return window.location.hash.length > 0
}

export default function Login (props) {
  const { history, setLoggedInUser, auth0Config } = props
  const auth0 = new Auth0.WebAuth(auth0Config)
  const isRedirect = isAuthZeroRedirect()

  useEffect(() => {
    if(isAuthZeroRedirect()) {
      handleRedirect()
      return
    }

    setTimeout(() => {
      login()
    }, 300)
  },[window.location.hash])

  const handleRedirect = () => {
    auth0.parseHash({ hash: window.location.hash }, (err, authResult) => {
      if (err) {
        return handleError()
      }

      handleParseHashSuccess(authResult)
    })
  }

  const handleParseHashSuccess = (authResult) => {
    auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (err) {
        return handleError()
      }

      handleLoginSuccess(profile, authResult)
    })
  }

  const handleError = () => {
    // bounce user back to login page in the event of an error
    login()
  }

  const handleLoginSuccess = (profile, authResult) => {
    // save user in localstorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // save token in localstorage
    setToken(authResult.idToken, authResult.expiresIn)
    // save user in Redux
    setLoggedInUser(profile)
    // bounce user into the app
    history.push('/')
  }

  const setToken = (idToken, expiresIn) => {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('id_token_expiresAt', Date.now() + (1000 * expiresIn))
  }

  const login = () => {
    const { location } = window

    auth0.authorize({
      responseType: 'token id_token',
      redirectUri: `${location.protocol}//${location.hostname}${(location.port ? `:${location.port}` : '')}/login`,
      scope: 'openid profile email'
    })
  }

  if(isRedirect) {
    return (
      <div>Finalizing login...</div>
    )
  }

  return (
    <div>Redirecting to login service...</div>
  )
}
