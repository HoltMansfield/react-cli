import { useSubstate } from 'use-substate'
import { foundationActions } from '@dol/react-app-essentials'


const useSelectedLanguage = () => {
  const [selectedLanguage, dispatch] = useSubstate(state => {
    return state.foundation.selectedLanguage
  })

  const setSelectedLanguage = (newSelectedLanguage) => {
    dispatch(foundationActions.setSelectedLanguage(newSelectedLanguage))
  }

  return { selectedLanguage, setSelectedLanguage }
}

export { useSelectedLanguage }
