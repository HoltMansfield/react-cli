import { useContext } from 'react'
import { __RouterContext } from 'react-router'
/*
  This hook takes the 'react-router' context and passes it to useContext
  react then returns the current context value, the hook returns the history property of the context value
*/

export const useRouter = () => {
  const routerContext = useContext(__RouterContext)
  return { history: routerContext.history }
}
