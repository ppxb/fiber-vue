import type { RouteRecordRaw } from 'vue-router'

const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Workspace',
    redirect: '/work/space'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  }
]

export default baseRoutes
