import { renderHook, cleanup } from 'react-hooks-testing-library'

// testdoubles go here
const captureException = td.func()
const useSentryDouble = {
  useSentry: () => {
    return {
      captureException
    }
  }
}
td.replace('hooks/core/use-sentry/useSentry', useSentryDouble)
const error = td.func()
const useToasterDouble = {
  useToaster: () => {
    return {
      error
    }
  }
}
td.replace('hooks/core/use-toaster/useToaster', useToasterDouble)
const translateMessage = td.func()
const useTranslateMessageDouble = {
  useTranslateMessage: () => {
    return {
      translateMessage
    }
  }
}
td.replace('hooks/core/use-translate-message/useTranslateMessage', useTranslateMessageDouble)


// always REQUIRE in module under test LAST so it gets the testdoubles
const { useHandleError } = require('./useHandleError')


afterEach(() => {
  td.reset() // resets all test doubles
  cleanup() // Unmounts any React trees that were mounted with renderHook
})

test('returns expected intial value', () => {
  const messageId = 'api.gettingData.Tanks'
  const defaultMessage = 'An error occurred while getting tank data'
  const jsError = new Error('mock-error')
  const data = { error: 'data' }
  const dolError = {
    messageId,
    defaultMessage,
    data,
    error: jsError,
  }
  const expectedTranslation = 'translated'

  td.when(translateMessage(dolError))
    .thenReturn(expectedTranslation)

  // render the hook in an unseen component
  const { result } = renderHook(() => useHandleError())

  result.current.handleError(dolError)

  td.verify(captureException(dolError.error, dolError.data))
  td.verify(error(expectedTranslation))
})
