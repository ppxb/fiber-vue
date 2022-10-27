import { AppRouteRecordRaw } from '../types'

const layout = () => import('@/layout/index.vue')

const asset: AppRouteRecordRaw = {
  component: layout,
  children: [
    {
      path: '/asset/list',
      name: 'AssetList',
      component: () => import('@/views/asset/list/index.vue'),
      meta: {
        title: '工作空间'
      }
    },
    {
      path: '/asset/check',
      name: 'AssetCheck',
      component: () => import('@/views/asset/check/index.vue'),
      meta: {
        title: '工作空间'
      }
    }
  ]
}

export default asset
