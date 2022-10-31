import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout } from '@/api/user'
import { clearToken, setToken } from '@/utils/auth'
import { LoginData, UserInfo } from '@/api/user/types'
import type { RouteRecordRaw } from 'vue-router'
import { useStorage } from '@vueuse/core'

interface UserState {
  userInfo: Nullable<Recordable>
  token: Nullable<string>
  menuRoutes: RouteRecordRaw[]
}

const menuRoutes: any = import.meta.glob('../../router/routes/modules/*/*.ts', {
  eager: true
})

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      userInfo: useStorage('userInfo', null, sessionStorage).value,
      token: useStorage('token', null, sessionStorage).value,
      menuRoutes: useStorage('userRoutes', [], sessionStorage).value
    }
  },
  getters: {},
  actions: {
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        this.setToken(res.data.token)
        const userInfo = useStorage('userInfo', {}, sessionStorage)
        userInfo.value = res.data.userInfo
        this.userInfo = res.data.userInfo
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
    },
    setToken(token: string) {
      const tokenRef = useStorage('token', token, sessionStorage)
      tokenRef.value = token
      this.token = token
    },
    setUserMenuRoutes() {
      const userRoutes = useStorage<RouteRecordRaw[]>(
        'userRoutes',
        [],
        sessionStorage
      )
      const routeModules = Object.keys(menuRoutes).reduce((routes, key) => {
        const module = menuRoutes[key]?.default || {}
        routes.push(module)
        return routes
      }, [] as any)
      routeModules.sort((p: any, n: any) => p.sort - n.sort)
      const routes = routeModules.map((it: any) => it.routes).flat()
      userRoutes.value = routes
      this.menuRoutes = routes
    }
  }
})

export default useUserStore
