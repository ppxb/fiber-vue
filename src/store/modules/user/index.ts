import { LoginData } from '@/api/user'
import { defineStore } from 'pinia'
import { UserState } from './types'
import { login as userLogin } from '@/api/user'
import { clearToken, setToken } from '@/utils/auth'

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

  actions: {
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        setToken(res.data.token)
      } catch (err) {
        clearToken()
        throw err
      }
    }
  }
})

export default useUserStore
