import type { RouteRecordRaw } from 'vue-router'

const layout = () => import('@/layout/index.vue')

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: layout,
    redirect: '/dashboard/workspace',
    meta: {
      title: '控制台'
    },
    children: [
      {
        path: 'workspace',
        name: 'Workspace',
        component: () => import('@/views/dashboard/workspace/index.vue'),
        meta: {
          title: '分析'
        }
      }
    ]
  }
]

export default {
  sort: 1,
  routes: dashboardRoutes
}
