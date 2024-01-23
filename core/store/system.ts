import { defineStore } from 'pinia'

interface IState {
  loading: boolean
}

export const useSystem = defineStore('system', {
  state: (): IState => {
    return {
      loading: false
    }
  },
  getters: {},
  actions: {
    setSystemLoading(payload: boolean) {
      this.loading = payload
    }
  }
})
