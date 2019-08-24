import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { useRouter } from 'hooks/core/use-router/useRouter'
import { useScrollBack } from 'hooks/core/use-scroll-back/useScrollBack'
import { NotFound } from 'components/core/routing/not-found/NotFound'
import { RouteLoading } from 'components/core/routing/route-loading/RouteLoading'
import { preloadAllRoutes } from './PreloadRoutes'
import { AuthorizedRoute } from './AuthorizedRoute'
const CreateAccount = Loadable({ loader: () => import('./create-account/CreateAccount'), loading: RouteLoading })
const Login = Loadable({ loader: () => import('./login/Login'), loading: RouteLoading })
const ForgotPassword = Loadable({ loader: () => import('./forgot-password/ForgotPassword'), loading: RouteLoading })
const ChangePassword = Loadable({ loader: () => import('./change-password/ChangePassword'), loading: RouteLoading })


function RouteTable () {
  const { history } = useRouter()
  useScrollBack(history)
  preloadAllRoutes()

  return (
    <Switch>
      {/* Default Route */}
      <Route exact path="/create-account" component={CreateAccount} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <AuthorizedRoute exact path="/change-password" component={ChangePassword} />

      {/* 404 route must be last */}
      <Route component={NotFound} />
    </Switch>
  )
}

export { RouteTable }
