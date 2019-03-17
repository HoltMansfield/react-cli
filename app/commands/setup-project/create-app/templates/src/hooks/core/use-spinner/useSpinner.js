import { useSubstate } from 'use-substate'
import * as actions from 'redux/actions'


export const useSpinner = () => {
  const [showSpinner, dispatch] = useSubstate(state => {
    return state.foundation.showSpinner
  })

  const setShowSpinner = (newShowSpinnerValue) => {
    dispatch(actions.foundation.setShowSpinner(newShowSpinnerValue))
  }

  return { showSpinner, setShowSpinner }
}
