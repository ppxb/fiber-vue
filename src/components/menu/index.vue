<script lang="tsx">
  import { compile, defineComponent, h, ref } from 'vue'
  import { RouteMeta, RouteRecordRaw, useRoute, useRouter } from 'vue-router'
  import { regexUrl, openWindow } from '@/utils'

  export default defineComponent({
    setup: () => {
      const route = useRoute()
      const router = useRouter()

      const openKeys = ref<string[]>([])
      const selectedKeys = ref<string[]>([])

      const goto = (item: RouteRecordRaw) => {
        if (regexUrl.test(item.path)) {
          openWindow(item.path)
          selectedKeys.value = [item.name as string]
          return
        }
        const { hideInMenu, activeMenu } = item.meta as RouteMeta
        if (route.name === item.name && !hideInMenu && !activeMenu) {
          selectedKeys.value = [item.name as string]
          return
        }

        router.push({
          name: item.name
        })
      }

      const renderSubMenu = () => {
        function travel(_route: RouteRecordRaw[], nodes = []) {
          if (_route) {
            _route.forEach((e) => {
              const icon = e?.meta?.icon
                ? () => h(compile(`<${e.meta?.icon}>`))
                : null
              const node =
                e?.children && e?.children.length !== 0 ? (
                  <a-sub-menu
                    key={e?.name}
                    v-slots={{
                      icon,
                      title: () => h(compile(e?.meta?.local || ''))
                    }}
                  >
                    {travel(e?.children)}
                  </a-sub-menu>
                ) : (
                  <a-menu-item
                    key={e?.name}
                    v-slots={{ icon }}
                    onClick={() => goto(e)}
                  >
                    {e?.name || ''}
                  </a-menu-item>
                )
              nodes.push(node as never)
            })
          }
          return nodes
        }
        return travel(menuTree.value)
      }

      return () => (
        <a-menu
          v-model:open-keys={openKeys.value}
          auto-open={false}
          selected-keys={selectedKeys.value}
          auto-open-selected={true}
          level-indent={34}
          style="height:100%"
        >
          {renderSubMenu()}
        </a-menu>
      )
    }
  })
</script>
