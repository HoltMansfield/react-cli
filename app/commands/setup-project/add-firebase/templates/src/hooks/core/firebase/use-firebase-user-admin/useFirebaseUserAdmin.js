import { useFirebase } from 'hooks/core/firebase/use-firebase/useFirebase'
import { useHandleError } from 'hooks/core/use-handle-error/useHandleError'
import { useToaster } from 'hooks/core/use-toaster/useToaster'


export const useFirebaseUserAdmin = () => {
  const { auth, db } = useFirebase()
  const { handleGenericCritical, handleError } = useHandleError()
  const { success } = useToaster()

  const createUserProfile = async (createUserResult) => {
    try {
      const profile = {
        createdIn: 'Web App'
      }
      await db.collection('userProfile')
              .doc(createUserResult.uid)
              .set(profile)

      return profile
    } catch (error) {
      debugger
      const data = { origin: 'useFirebaseUserAdmin.createUserProfile', createUserResult }
      handleGenericCritical({ data, error })
    }
  }

  const createUser = async (email, password) => {
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password)
      const profile = await createUserProfile(result.user)
      success('A reset password email has been sent to your account.')
      return { user: result.user, profile }
    } catch (error) {
      debugger
      const data = { origin: 'useFirebaseUserAdmin.createUser', email }
      handleGenericCritical({ data, error })
    }
  }

  const login = async (loginAttempt) => {
    try {
      await auth.signInWithEmailAndPassword(loginAttempt.email, loginAttempt.password)
      return true
    } catch (error) {
      const data = { origin: 'useFirebaseUserAdmin.login', loginAttempt }
      handleGenericCritical({ data, error })
    }
  }

  const logout = async () => {
    try {
      const result = await auth.signOut()
      return result
    } catch (error) {
      const data = { origin: 'useFirebaseUserAdmin.logout', user: auth.user }
      handleError({
        data,
        error,
        messageId: 'api.login.failure',
        defaultMessage: 'Email or password is incorrect'
      })
    }
  }

  const forgotPassword = async (email) => {
    try {
      const result = await auth.sendPasswordResetEmail(email)
      success('A reset password email has been sent to your account.')
      return result
    } catch (error) {
      debugger
      const data = { origin: 'useFirebaseUserAdmin.forgotPassword', email }
      handleGenericCritical({ data, error })
    }
  }

  const changePassword = async (newPassword) => {
    try {
      const result = await auth.currentUser.updatePassword(newPassword)
      success('Your password has been updated')
      return result
    } catch (error) {
      const data = { origin: 'useFirebaseUserAdmin.updatePassword', newPassword }
      handleGenericCritical({ data, error })
    }
  }

  return {
    createUser,
    login,
    logout,
    forgotPassword,
    changePassword
  }
}
