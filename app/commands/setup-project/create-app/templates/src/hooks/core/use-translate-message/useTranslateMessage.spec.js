import { renderHook, cleanup } from 'react-hooks-testing-library'


// testdoubles go here
const useLanguageImporterDouble = td.replace('hooks/core/use-language-importer/useLanguageImporter')

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useTranslateMessage } = require('./useTranslateMessage')


afterEach(() => {
  td.reset() // resets all test doubles
  cleanup() // Unmounts any React trees that were mounted with renderHook
})

test('returns default value when app set to english', () => {
  const messageId = 'api.gettingData.Tanks'
  const defaultMessage = 'An error occurred while getting tank data'
  const dolError = {
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

  const translatedResult = result.current.translateMessage(dolError)
  expect(translatedResult).toEqual(dolError.defaultMessage)
})

test('returns translated value when app set to non-english language', () => {
  const messageId = 'expected.message'
  const defaultMessage = 'Expected message details'
  const dolError = {
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

  const translatedResult = result.current.translateMessage(dolError)
  expect(translatedResult).toEqual(messages['expected.message'])
})
