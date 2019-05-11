import { useSentry } from 'hooks/core/use-sentry/useSentry'
import { useToaster } from 'hooks/core/use-toaster/useToaster'
import { useTranslateMessage } from 'hooks/core/use-translate-message/useTranslateMessage'


export const useHandleError = (errorInstance) => {
  const { captureException } = useSentry()
  const { translateMessage } = useTranslateMessage()
  const { error } = useToaster()


  const handleError = (errorInstance) => {
    // before we have a chance to make any more errors, report to Sentry
    captureException(errorInstance.error, errorInstance.data)
    const message = translateMessage(errorInstance)
    error(message)
  }

  return {
    handleError
  }
}
