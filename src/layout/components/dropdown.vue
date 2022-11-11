<template>
  <n-dropdown trigger="hover" :on-select="handleSelect" :options="options">
    <n-el tag="div" class="" placement="bottom-end">
      <n-avatar
        round
        :size="32"
        object-fit="cover"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F12917180531%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670720997&t=a1f131da91563743d98172024dff959b"
      />
    </n-el>
  </n-dropdown>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store'

  const userStore = useUserStore()

  const options = [
    {
      label: '个人中心',
      key: 'center'
    },
    {
      type: 'divider',
      key: 'divider'
    },
    {
      label: '退出登录',
      key: 'logout'
    }
  ]

  const handleSelect = async (key: string) => {
    switch (key) {
      case 'logout':
        sessionStorage.clear()
        window.location.reload()
    }
  }
</script>
