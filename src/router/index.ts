import { getToken } from '@/utils/auth'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import appRoutes from './routes'

const routes: RouteRecordRaw[] = [
  { path: '', redirect: '/dashboard/workspace' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/asset.vue')
  },
  ...appRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = getToken()
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
