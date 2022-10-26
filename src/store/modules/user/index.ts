import { defineStore } from 'pinia'
import { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: undefined,
    name: undefined,
    avatar: undefined,
    phone: undefined,
    role: ''
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    }
  },

  actions: {}
})

export default useUserStore
