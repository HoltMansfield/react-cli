import { useSentry } from 'hooks/core/use-sentry/useSentry'
import { useToaster } from 'hooks/core/use-toaster/useToaster'
import { useTranslateMessage } from 'hooks/core/use-translate-message/useTranslateMessage'


export const useHandleError = (dolError) => {
  const { captureException } = useSentry()
  const { translateMessage } = useTranslateMessage()
  const { error } = useToaster()


  const handleError = (dolError) => {
    // before we have a chance to make any more errors, report to Sentry
    captureException(dolError.error, dolError.data)
    const message = translateMessage(dolError)
    error(message)
  }

  return {
    handleError
  }
}
