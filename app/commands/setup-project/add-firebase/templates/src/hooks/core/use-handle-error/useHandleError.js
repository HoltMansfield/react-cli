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

  const handleGenericCritical = (errorInstance) => {
    captureException(errorInstance.error, errorInstance.data)

    const messageId = 'api.criticalError'
    const defaultMessage = 'A critical error occurred.  Please refresh your browser.'
    const message = translateMessage({ messageId, defaultMessage })
    error(message)
  }

  const handleFirebaseCreate = (error, collectionName, collectionNameSingular, data) => {
    captureException(error, {...data, collectionName })

    const messageId = 'firebase.createError'
    const defaultMessage = 'An error occurred while creating a {name}.  Please try again.'
    const message = translateMessage({ messageId, defaultMessage })
    const messageBody = message.replace('{name}', collectionNameSingular)
    error(messageBody)
  }

  const handleFirebaseUpdate = (error, collectionName, collectionNameSingular, data) => {
    captureException(error, {...data, collectionName })

    const messageId = 'firebase.updateError'
    const defaultMessage = 'An error occurred while updating a {name}.  Please try again.'
    const message = translateMessage({ messageId, defaultMessage })
    const messageBody = message.replace('{name}', collectionNameSingular)
    error(messageBody)
  }

  const handleFirebaseDestroy = (error, collectionName, collectionNameSingular, data) => {
    captureException(error, {...data, collectionName })

    const messageId = 'firebase.deleteError'
    const defaultMessage = 'An error occurred while deleting a {name}.  Please try again.'
    const message = translateMessage({ messageId, defaultMessage })
    const messageBody = message.replace('{name}', collectionNameSingular)
    error(messageBody)
  }

  const handleFirebaseQuery = (error, collectionName, collectionNameSingular, data) => {
    captureException(error, {...data, collectionName })

    const messageId = 'firebase.queryError'
    const defaultMessage = 'An error occurred while fetching {name} data.  Please try refresh your browser.'
    const message = translateMessage({ messageId, defaultMessage })
    const messageBody = message.replace('{name}', collectionNameSingular)
    error(messageBody)
  }

  return {
    handleError,
    handleGenericCritical,
    handleFirebaseCreate,
    handleFirebaseUpdate,
    handleFirebaseDestroy,
    handleFirebaseQuery
  }
}
