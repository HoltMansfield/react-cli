import * as Sentry from '@sentry/browser'
import { getConfig } from 'config/clear-text'


export const useSentry = () => {
  const initializeSentry = () => {
    const config = getConfig()
    Sentry.init({
     dsn: config.sentryDsn
    })
  }

  const captureException = (error, errorInfo) => {
    if (process.env.REACT_APP_ENV === 'local') {
      return
    }

    Sentry.withScope(scope => {
      if (errorInfo) {
        // first capture any additional info
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key])
        })
      }
      // capture the actual erro that was thrown
      Sentry.captureException(error)
    })
  }

  return {
    initializeSentry,
    captureException
  }
}
