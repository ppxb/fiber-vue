import type { RouteRecordRaw } from 'vue-router'

const layout = () => import('@/layout/index.vue')

const assetRoutes: RouteRecordRaw[] = [
  {
    path: '/asset',
    name: 'Asset',
    component: layout,
    redirect: '/asset/list',
    meta: {
      title: '资产'
    },
    children: [
      {
        path: 'list',
        name: 'assetList',
        component: () => import('@/views/asset/list/index.vue'),
        meta: {
          title: '列表',
          header: '资产列表'
        }
      },
      {
        path: 'check',
        name: 'assetCheck',
        component: () => import('@/views/asset/check/index.vue'),
        meta: {
          title: '盘点',
          header: '资产盘点'
        }
      },
      {
        path: 'config',
        name: 'assetConfig',
        component: () => import('@/views/asset/check/index.vue'),
        meta: {
          title: '配置',
          header: '资产配置'
        }
      }
    ]
  }
]

export default {
  sort: 2,
  routes: assetRoutes
}
