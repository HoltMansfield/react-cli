import { useSubstate } from 'use-substate'
import * as actions from 'redux/actions'


export const useOverlay = () => {
  const [showOverlay, dispatch] = useSubstate(state => {
    return state.foundation.showOverlay
  })

  const setShowOverlay = (newShowOverlayValue) => {
    dispatch(actions.foundation.setShowOverlay(newShowOverlayValue))
  }

  return { showOverlay, setShowOverlay }
}
