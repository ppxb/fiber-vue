import { AppRouteRecordRaw } from '../types'

const layout = () => import('@/layout/index.vue')

const dashboard: AppRouteRecordRaw = {
  component: layout,
  children: [
    {
      path: '/dashboard/workspace',
      name: 'Workspace',
      component: () => import('@/views/dashboard/workspace/index.vue'),
      meta: {
        title: '工作空间'
      }
    }
  ]
}

export default dashboard
