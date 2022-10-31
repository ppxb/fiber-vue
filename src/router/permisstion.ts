import { useUserStore } from '@/store'
import { unref } from 'vue'
import type { Router } from 'vue-router'

const useRouterGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const token = unref(userStore.token)
    if (!token) {
      if (to.name === 'Login') {
        next()
      } else {
        next('/login')
      }
    } else {
      if (to.name === 'Login') {
        next('/dashboard')
      } else {
        next()
      }
    }
  })
}

export default useRouterGuard
