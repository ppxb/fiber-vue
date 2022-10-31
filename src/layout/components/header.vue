<template>
  <n-layout-header
    position="absolute"
    class="h-[100px] flex w-full flex-row-reverse justify-start items-center px-10 bg-dark-800"
  >
    <UserDropdown />
    <!-- <Toolbar /> -->
  </n-layout-header>
</template>

<script lang="ts" setup>
  import UserDropdown from './dropdown.vue'
</script>
