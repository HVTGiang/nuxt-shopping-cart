import { defineStore } from 'pinia'
import type { IUser } from '~/core/interfaces/user'

interface IState {
  user: IUser | undefined
}

export const useUser = defineStore('user', {
  state: (): IState => {
    return {
      user: undefined
    }
  },
  getters: {},
  actions: {
    setUser(payload: IUser) {
      this.user = payload
    }
  }
})
