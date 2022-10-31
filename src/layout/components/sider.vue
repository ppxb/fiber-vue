<template>
  <n-layout-sider
    class="z-[99] p-6"
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
