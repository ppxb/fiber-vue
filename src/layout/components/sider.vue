<template>
  <n-layout-sider
    class="z-[99] p-6 bg-[#F1F0F5]"
    collapse-mode="width"
    :width="320"
    :native-scrollbar="false"
  >
    <div class="w-full h-[48px] flex items-center justify-start mb-8">
      <div class="flex text-3xl font-700 items-center mb-3">
        <div class="bg-[#e7f6df] px-[10px] rounded-[12px] mr-[4px]">F</div>
        <div>iber</div>
      </div>
    </div>
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
