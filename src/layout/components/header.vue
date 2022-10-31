<template>
  <n-layout-header
    position="absolute"
    class="h-[100px] flex w-full justify-between items-center px-10"
  >
    <div class="text-4xl font-700">{{ headerTitle }}</div>
    <div>
      <UserDropdown />
    </div>
    <!-- <Toolbar /> -->
  </n-layout-header>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import UserDropdown from './dropdown.vue'

  const route = useRoute()
  const headerTitle = ref<string | undefined>('')

  watch(
    () => route.path,
    () => {
      headerTitle.value = route.meta.header
    },
    { immediate: true }
  )
</script>
