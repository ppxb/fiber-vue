// import { AppRouteRecordRaw } from '../types'

import type { RouteRecordRaw } from 'vue-router'

const layout = () => import('@/layout/index.vue')

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/work',
    name: 'Work',
    // component: () => import('@/layout/index.vue'),
    redirect: '/work/space',
    meta: {
      title: '工作空间'
    },
    children: [
      {
        path: 'space',
        component: () => import('@/views/dashboard/workspace/index.vue')
      }
    ]
  }
]

export default dashboardRoutes
