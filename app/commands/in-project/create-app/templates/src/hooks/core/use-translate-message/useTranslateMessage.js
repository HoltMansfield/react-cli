import { useLanguageImporter } from 'hooks/core/use-language-importer/useLanguageImporter'


export const useTranslateMessage = () => {
  const { languageState } = useLanguageImporter()

  const translateMessage = (dolObject) => {
    // dolObject is: { messageId, defaultMessage } implemented by dolError and dolMessage
    if (languageState.loadedLanguage === 'en') {
      return dolObject.defaultMessage
    }

    return languageState.messages[dolObject.messageId]
  }

  return {
    translateMessage
  }
}
