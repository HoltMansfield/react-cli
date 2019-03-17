import { useSubstate } from 'use-substate'
import { foundationActions } from '@dol/react-app-essentials'


export const useSpinner = () => {
  const [showSpinner, dispatch] = useSubstate(state => {
    return state.foundation.showSpinner
  })

  const setShowSpinner = (newShowSpinnerValue) => {
    dispatch(foundationActions.setShowSpinner(newShowSpinnerValue))
  }

  return { showSpinner, setShowSpinner }
}
