import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import appRoutes from './routes'

const routes: RouteRecordRaw[] = [
  { path: '', redirect: 'login' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      requireAuth: false
    }
  },
  ...appRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
