import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { MenuOption } from 'naive-ui'
import { useUserStore } from '@/store'
import getMenuOptions from '@/utils/router'
import { useRoute } from 'vue-router'

export interface IUseMenu {
  menuRef: Ref<MenuOption[]>
  expandKeys: Ref<string[]>
  updateExpandKeys: (keys: string[]) => void
  currentMenu: Ref<string>
  updateValue: (key: string) => void
}

const useMenu = (): IUseMenu => {
  const userStore = useUserStore()
  const route = useRoute()

  const menuRef = ref<MenuOption[]>([])
  const expandKeys = ref<string[]>([])
  const currentMenu = ref<string>('')

  const routes = computed(() => userStore.menuRoutes)
  const menus = getMenuOptions(routes.value)

  // @ts-ignore
  menuRef.value = menus

  const setKeys = () => {
    const matched = route.matched
    const matchedNames = matched.map((it) => it.name as string)
    const matchLen = matchedNames.length
    const matchExpandKeys = matchedNames.slice(0, matchLen - 1)
    const openKey = matchedNames[matchLen - 1]
    expandKeys.value = matchExpandKeys
    if (route?.meta?.activeMenuName) {
      currentMenu.value = route.meta.activeMenuName as string
    } else {
      currentMenu.value = openKey
    }
  }

  watch(
    () => route.path,
    () => setKeys(),
    { immediate: true }
  )

  const updateExpandKeys = (keys: string[]) => {
    expandKeys.value = keys
  }

  const updateValue = (key: string) => {
    currentMenu.value = key
  }

  return {
    menuRef,
    expandKeys,
    updateExpandKeys,
    currentMenu,
    updateValue
  }
}

export default useMenu
