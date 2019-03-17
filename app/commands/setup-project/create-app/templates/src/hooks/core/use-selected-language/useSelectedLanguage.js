import { useSubstate } from 'use-substate'
import * as actions from 'redux/actions'


const useSelectedLanguage = () => {
  const [selectedLanguage, dispatch] = useSubstate(state => {
    return state.foundation.selectedLanguage
  })

  const setSelectedLanguage = (newSelectedLanguage) => {
    dispatch(actions.foundation.setSelectedLanguage(newSelectedLanguage))
  }

  return { selectedLanguage, setSelectedLanguage }
}

export { useSelectedLanguage }
