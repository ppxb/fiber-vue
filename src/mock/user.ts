import { MockParams } from '@/types/mock'
import setupMock, {
  failResponseWrap,
  successResponseWrap
} from '@/utils/setup-mock'
import Mock from 'mockjs'

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { mobile, password } = JSON.parse(params.body)
      if (!mobile) {
        return failResponseWrap(null, '手机号码不能为空', 50000)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000)
      }
      if (mobile === '1' && password === '1') {
        window.localStorage.setItem('userRole', 'admin')
        return successResponseWrap({
          token: '123456'
        })
      }
      if (mobile === '2' && password === '2') {
        window.localStorage.setItem('userRole', 'user')
        return successResponseWrap({
          token: '654321'
        })
      }

      return failResponseWrap(null, '账号或密码错误', 50000)
    })

    Mock.mock(new RegExp('/api/user/menu'), () => {
      const menuList = [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            locale: '控制台',
            requireAuth: true,
            order: 1
          },
          children: [
            {
              path: 'workplace',
              name: 'Workplace',
              meta: {
                locale: '工作空间',
                requireAuth: true
              }
            },
            {
              path: 'https://arco.design',
              name: 'arcoWebsite',
              meta: {
                locale: 'arcoWebsite',
                requireAuth: true
              }
            }
          ]
        }
      ]
      return successResponseWrap(menuList)
    })
  }
})
