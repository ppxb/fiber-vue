import { AppRouteRecordRaw } from '../types'

const layout = () => import('@/layout/default-layout.vue')

const dashboard: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: layout,
  meta: {
    requireAuth: true,
    icon: 'icon-dashboard',
    order: 0
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        requireAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'monitor',
      name: 'Monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}

export default dashboard
