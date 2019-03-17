import React from 'react'
import { IntlProvider } from 'react-intl'


export function ProvideLanguageTranslations ({ selectedLanguage, messages, children }) {
  return (
    <IntlProvider locale={selectedLanguage} messages={messages}>
      {children}
    </IntlProvider>
  )
}
