<template>
  <a-sub-menu
    :key="data.path"
    v-if="data.children && data.children.length && !data.hidden"
  >
    <template #title>{{ data.name }}</template>
    <MenuItem
      v-for="item in data.children"
      :key="item.id"
      :data="item"
      @click="onClickMenuItem"
    ></MenuItem>
  </a-sub-menu>

  <a-menu-item
    v-else
    :key="data.id"
    @click="onClickMenuItem(data)"
    v-if="!data.hidden"
  >
    {{ data.name }}
  </a-menu-item>
</template>

<script setup lang="ts">
  import { MenuItem as MenuItemProps } from '@/store/modules/menu'
  import type { PropType } from 'vue'

  defineProps({
    data: {
      type: Object as PropType<MenuItemProps>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  })

  const emit = defineEmits(['click'])

  const onClickMenuItem = (item: MenuItemProps) => {
    emit('click', item)
  }
</script>
