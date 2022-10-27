import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout } from '@/api/user'
import { clearToken, setToken } from '@/utils/auth'
import { LoginData, UserInfo } from '@/api/user/types'

interface UserState {
  userInfo: UserInfo
}

const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userInfo: JSON.parse(localStorage.getItem('UserInfo') as string) || {
        id: 0,
        name: '',
        avatar: '',
        phone: '',
        role: ''
      }
    }
  },
  getters: {
    // userInfo(state: UserState): UserState {
    //   return { ...state }
    // }
  },

  actions: {
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        setToken(res.data.token)
        this.userInfo = res.data.userInfo
        localStorage.setItem('UserInfo', JSON.stringify(this.userInfo))
      } catch (err) {
        clearToken()
        throw err
      }
    },
    async logout() {
      try {
        await userLogout()
        clearToken()
      } catch (err) {
        return err
      }
    }
  }
})

export default useUserStore
