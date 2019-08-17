import { toast } from 'react-toastify'


export const useToaster = () => {
  const error = (message) => {
    toast.error(message)
  }

  const success = (message) => {
    toast.success(message)
  }

  return {
    error,
    success
  }
}
