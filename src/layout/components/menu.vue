<template>
  <n-scrollbar>
    <n-menu
      :options="menus"
      :indent="16"
      :root-indent="16"
      :expanded-keys="expandKeys"
      :on-update:expanded-keys="updateExpandKeys"
      :value="currentMenu"
      :on-update:value="updateValue"
      class="text-4 font-600"
    />
  </n-scrollbar>
</template>

<script lang="ts" setup>
  import useMenu from '@/hooks/menu'

  const {
    menuRef: menus,
    expandKeys,
    currentMenu,
    updateExpandKeys,
    updateValue
  } = useMenu()
</script>
