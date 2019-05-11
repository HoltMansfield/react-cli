import { renderHook, cleanup } from 'react-hooks-testing-library'


// TD replace means that anything that imports math-sin now receives our double instead of the real code
const sentryDouble = td.replace('@sentry/browser')
const configDouble = td.replace('config/clear-text')

// always REQUIRE in module under test LAST so it gets the testdoubles
const { useSentry } = require('./useSentry')

afterEach(() => {
  td.reset() // resets all test doubles
})

test('initializeSentry calls SentryInit with value from config', () => {
  // render the hook in an unseen component
  const { result } = renderHook(() => useSentry())
  const mockConfig = {
    sentryDsn: 'mock-dsn-value'
  }
  const expectedSentryConfig = {
   dsn: mockConfig.sentryDsn
  }

  td.when(configDouble.getConfig())
    .thenReturn(mockConfig)

  // when we call calculateSin we know what the math-sin double will return
  result.current.initializeSentry()

  td.verify(sentryDouble.init(expectedSentryConfig))
})

// this test is very weak
test('captureException calls withScope', () => {
  const expectedError = new Error('Expected')
  // render the hook in an unseen component
  const { result } = renderHook(() => useSentry())

  // when we call calculateSin we know what the math-sin double will return
  result.current.captureException(expectedError)

  td.verify(sentryDouble.withScope(td.matchers.anything()))
})
