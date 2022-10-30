<template>
  <n-layout-sider
    class="z-[99]"
    collapse-mode="width"
    :width="200"
    bordered
    show-trigger
    :native-scrollbar="false"
  >
    <Menu />
  </n-layout-sider>
</template>

<script lang="ts" setup>
  import Menu from './menu.vue'
</script>

<style scoped>
  :deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
  }
</style>
