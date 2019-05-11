import { useLanguageImporter } from 'hooks/core/use-language-importer/useLanguageImporter'


export const useTranslateMessage = () => {
  const { languageState } = useLanguageImporter()

  const translateMessage = (i18nObject) => {
    // i18nObject is: { messageId, defaultMessage } implemented by errorInstance and i18nMessage
    if (languageState.loadedLanguage === 'en') {
      return i18nObject.defaultMessage
    }

    return languageState.messages[i18nObject.messageId]
  }

  return {
    translateMessage
  }
}
