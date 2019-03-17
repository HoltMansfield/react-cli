import { useState, useEffect } from 'react'
import { addLocaleData } from 'react-intl'
import * as ar from 'react-intl/locale-data/ar'
import { useSelectedLanguage } from 'hooks/core/use-selected-language/useSelectedLanguage'


function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

if (isIterable(ar)) {
  //ar is not iterable when running unit tests
  addLocaleData([...ar])
}

setTimeout(() => {
  import('i18n/locales/ar.json')
    .then(Bar => {
      console.log('ar language file imported')
    })
}, 2000)
/*
  Selected language is set when the user has chosen a language from the drop down
  Loaded language is set when the messages file for the selected lanuage has downloaded

  The selected language changes first as it is updated synchronously in response to the user
  loadedLanguage is then loaded asynchronously

  So the two values selectedLanguage & loadedLanguage will be out of sync for a moment while the file loads
*/
const useLanguageImporter = () => {
  const [languageState, setLanguageState] = useState({ loadedLanguage: 'en', messages: {} })
  const { selectedLanguage } = useSelectedLanguage()

  useEffect(() => {
    if (!selectedLanguage || !selectedLanguage.length) {
      return
    }

    if (selectedLanguage === 'en') {
      setLanguageState({
        loadedLanguage: selectedLanguage,
        messages: {}
      })
      return
    }
    import(`i18n/locales/${selectedLanguage}.json`)
      .then(Bar => {
        setLanguageState({
          loadedLanguage: selectedLanguage,
          messages: Bar.default
        })
      })
  },[selectedLanguage])

  return { languageState }
}

export { useLanguageImporter }
