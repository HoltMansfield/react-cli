import { useSubstate } from 'use-substate'
import * as actions from 'redux/actions'

/*
  This is not like our other redux patterns

  Please read this:
  packages/scheduler/src/redux/reducers/route-state/route-state.js

*/

export const useRouteState = () => {
  const [routeState, dispatch] = useSubstate(state => {
    return state.routeState.value
  })

  const setRouteState = (newValue) => {
    // routeState reducer performs a shallow merge
    dispatch(actions.routeState.setValue(newValue))
  }

  return {
    routeState,
    setRouteState
  }
}
