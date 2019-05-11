import { renderHook, cleanup } from 'react-hooks-testing-library'


// testdoubles go here
const useLanguageImporterDouble = td.replace('hooks/core/use-language-importer/useLanguageImporter')

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useTranslateMessage } = require('./useTranslateMessage')


afterEach(() => {
  td.reset() // resets all test doubles
})

test('returns default value when app set to english', () => {
  const messageId = 'api.gettingData'
  const defaultMessage = 'An error occurred while getting data'
  const errorInstance = {
    messageId,
    defaultMessage,
  }

  td.when(useLanguageImporterDouble.useLanguageImporter())
    .thenReturn({
      languageState: {
        loadedLanguage: 'en',
        messages: {
          'expected.message': 'expected message value'
        }
      }
    })

  // render the hook in an unseen component
  const { result } = renderHook(() => useTranslateMessage())

  const translatedResult = result.current.translateMessage(errorInstance)
  expect(translatedResult).toEqual(errorInstance.defaultMessage)
})

test('returns translated value when app set to non-english language', () => {
  const messageId = 'expected.message'
  const defaultMessage = 'Expected message details'
  const errorInstance = {
    messageId,
    defaultMessage,
  }

  const messages = {
    'expected.message': 'expected message value'
  }
  td.when(useLanguageImporterDouble.useLanguageImporter())
    .thenReturn({
      languageState: {
        loadedLanguage: 'fr',
        messages
      }
    })

  // render the hook in an unseen component
  const { result } = renderHook(() => useTranslateMessage())

  const translatedResult = result.current.translateMessage(errorInstance)
  expect(translatedResult).toEqual(messages['expected.message'])
})
