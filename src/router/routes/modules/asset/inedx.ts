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
          title: '列表'
        }
      },
      {
        path: 'check',
        name: 'assetCheck',
        component: () => import('@/views/asset/check/index.vue'),
        meta: {
          title: '盘点'
        }
      }
    ]
  }
]

export default {
  sort: 2,
  routes: assetRoutes
}
