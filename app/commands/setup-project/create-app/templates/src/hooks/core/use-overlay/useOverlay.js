import { useSubstate } from 'use-substate'
import { foundationActions } from '@dol/react-app-essentials'


export const useOverlay = () => {
  const [showOverlay, dispatch] = useSubstate(state => {
    return state.foundation.showOverlay
  })

  const setShowOverlay = (newShowOverlayValue) => {
    dispatch(foundationActions.setShowOverlay(newShowOverlayValue))
  }

  return { showOverlay, setShowOverlay }
}
