import { createRouter, createWebHashHistory } from 'vue-router'
import useRouterGuard from './permisstion'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// useRouterGuard(router)

export default router
