<template>
  <n-scrollbar>
    <n-menu
      :options="menus"
      :root-intent="16"
      :intent="12"
      :expanded-keys="expandKeys"
      :on-update:expanded-keys="updateExpandKeys"
      :value="currentMenu"
      :on-update:value="updateValue"
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
