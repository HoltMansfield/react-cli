import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import { useRouter } from 'hooks/core/use-router/useRouter'
import { useScrollBack } from 'hooks/core/use-scroll-back/useScrollBack'
import { NotFound } from 'components/core/routing/not-found/NotFound'
import { RouteLoading } from 'components/core/routing/route-loading/RouteLoading'
import { useLoggedInUser } from 'hooks/core/use-logged-in-user/useLoggedInUser'
import { getSecureConfig } from 'config/secure'
import { preloadAllRoutes } from './PreloadRoutes'
// import { AuthorizedRoute } from './AuthorizedRoute'


const config = getSecureConfig()

function RouteTable () {
  const { history } = useRouter()
  const { setLoggedInUser } = useLoggedInUser()
  useScrollBack(history)
  preloadAllRoutes()

  return (
    <Switch>
      {/* Default Route */}
      <Route exact path="/" component={ExampleComponent} /> } />

      {/* 404 route must be last */}
      <Route component={NotFound} />
    </Switch>
  )
}

export { RouteTable }
