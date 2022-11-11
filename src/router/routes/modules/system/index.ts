import type { RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'

const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    component: layout,
    redirect: '/system/users',
    meta: {
      title: '系统'
    },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/system/users/index.vue'),
        meta: {
          title: '用户'
        }
      },
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/system/department/index.vue'),
        meta: {
          title: '部门和组织'
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/asset/check/index.vue'),
        meta: {
          title: '角色配置'
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/asset/check/index.vue'),
        meta: {
          title: '字典配置'
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/asset/check/index.vue'),
        meta: {
          title: '服务状态'
        }
      }
    ]
  }
]

export default {
  sort: 3,
  routes: systemRoutes
}
