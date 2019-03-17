import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import { useRouter } from 'hooks/core/use-router/useRouter'
import { useScrollBack } from 'hooks/core/use-scroll-back/useScrollBack'
import { NotFound } from 'components/core/routing/not-found/NotFound'
import { RouteLoading } from 'components/core/routing/route-loading/RouteLoading'
import { useLoggedInUser } from 'hooks/core/use-logged-in-user/useLoggedInUser'
import { getConfig } from 'config/secure'
import { preloadAllRoutes } from './PreloadRoutes'
// import { AuthorizedRoute } from './AuthorizedRoute'
const Login = Loadable({ loader: () => import('components/core/routing/login/Login'), loading: RouteLoading })



const ExampleComponent = () => {
  return (
    <div><Link to="/login">Login</Link></div>
  )
}
const config = getConfig()

function RouteTable () {
  const { history } = useRouter()
  const { setLoggedInUser } = useLoggedInUser()
  useScrollBack(history)
  preloadAllRoutes()

  return (
    <Switch>
      {/* Default Route */}
      <Route exact path="/" component={ExampleComponent} /> } />
      <Route path='/login' render={(props) => <Login {...props} history={history} setLoggedInUser={setLoggedInUser} auth0Config={config.auth0} />} />

      {/* 404 route must be last */}
      <Route component={NotFound} />
    </Switch>
  )
}

export { RouteTable }
