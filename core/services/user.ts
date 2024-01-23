import useFirebase from '~/composables/useFirebase'
import { signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth'
import appConstant from '~/core/constant/app.constant'
import { getBy } from '~/composables/useFirebase/common'
import type { IUser } from '~/core/interfaces/user'
import { useToast } from 'vue-toastification'
const { auth } = useFirebase()
const toast = useToast()

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    // sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    if (userCredential) {
      // credential is correct
      // persis token (can be deleted)
      const token = await userCredential.user.getIdTokenResult()
      localStorageHandler('set', appConstant.NUXT_TOKEN_STORAGE_KEY, token.token)
      // get login user
      const user = await getUserByEmail(email)
      if (user) return user
    }
  } catch (error) {
    const { code: errorCode, message: errorMessage } = error as { code: string; message: string }
    if (errorCode === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      toast.error('Invalid login credentials!')
    }
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const users = await getBy<IUser>('user', 'email', email)
    if (!!users?.length) {
      return users[0]
    }
    return undefined
  } catch (error) {
    toast.error('Get user failed!')
  }
}
