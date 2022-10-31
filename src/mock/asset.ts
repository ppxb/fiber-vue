import { MockParams } from '@/types/mock'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'
import Mock from 'mockjs'

const { Random } = Mock

setupMock({
  setup: () => {
    const { assets } = Mock.mock({
      'assets|500': [
        {
          'id': Random.guid(),
          'project|1': [
            '东安湖大运村智慧城市示范项目',
            '龙泉驿区智慧蓉城建设项目'
          ],
          'sonProject|1': [
            '智慧小区',
            '智慧道路',
            '智慧大运',
            '智慧应急',
            '智慧环保'
          ],
          'part|1': [
            '前端检测感知子系统-水质自动检测',
            '临街城管球',
            '桥梁检测系统'
          ],
          'name|1': [
            '摄像头',
            '传感器',
            '机柜',
            '服务器',
            '电脑',
            '总氮水质分析仪'
          ],
          'type|1': ['固定资产', '无形资产'],
          'brand|1': ['联想', '大华', '华为', '海康威视'],
          'model|1': ['LFS-2002(TN)', 'CW-1200', 'CX-800', 'QSG-4420C'],
          'address|1': [
            '智慧治理中心 · 龙泉驿区，成都市',
            '经开园区投资有限公司 · 龙泉驿区，成都市'
          ],
          'indate|1': ['2022/9/14', '2022/10/21', '2022/11/1'],
          'value|1': [4261, 8874, 13654, 1278, 361],
          'status|1': ['正常', '维修中'],
          'checked|1': [false, true]
        }
      ]
    })

    Mock.mock(new RegExp('/api/asset/list'), (params: MockParams) => {
      const { page } = JSON.parse(params.body)
      let start = 0
      if (page != 1) {
        start = page * 10
      }
      const list = assets.slice(start, start + 10)
      return successResponseWrap({
        total: assets.length,
        page,
        list
      })
    })
  }
})
