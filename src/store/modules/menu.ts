import { defineStore } from 'pinia'

export interface MenuItem {
  id: string
  name: string
  icon?: string
  path?: string
  children?: MenuItem[]
  keepAlive?: boolean
  hidden?: boolean
}

interface MenuState {
  menuTree: MenuItem[]
}

const useMenuStore = defineStore('menu', {
  state: (): MenuState => {
    return {
      menuTree: [
        {
          icon: 'menu-work',
          id: 'YBP',
          name: '工作空间',
          path: '/dashboard/workspace',
          keepAlive: false,
          hidden: false
        }
      ]
    }
  }
})

export default useMenuStore
