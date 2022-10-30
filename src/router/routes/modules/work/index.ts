import type { RouteRecordRaw } from 'vue-router'

const layout = () => import('@/layout/index.vue')

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: layout,
    meta: {
      title: '控制台'
    },
    children: [
      {
        path: 'workspace',
        name: 'Workspace',
        component: () => import('@/views/dashboard/workspace/index.vue'),
        meta: {
          title: '工作空间'
        }
      }
    ]
  }
]

export default {
  sort: 1,
  routes: dashboardRoutes
}
