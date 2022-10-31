<template>
  <n-dropdown trigger="hover" :on-select="handleSelect" :options="options">
    <n-el tag="div" class="" placement="bottom-end">
      <n-avatar
        round
        :size="32"
        object-fit="cover"
        src="https://s1.ax1x.com/2022/07/05/jtMjGq.jpg"
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

  const handleSelect = () => {}
</script>
