import { toast } from 'react-toastify'


export const useToaster = () => {
  const error = (message) => {
    toast.error(message)
  }

  return {
    error
  }
}
