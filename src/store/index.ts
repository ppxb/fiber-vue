import { createPinia } from 'pinia'
import useUserStore from './modules/user'
import useMenuStore from './modules/menu'

const store = createPinia()

export { useUserStore, useMenuStore }
export default store
