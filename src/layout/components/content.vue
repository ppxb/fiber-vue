<template>
  <n-layout-content
    position="absolute"
    :native-scrollbar="false"
    class="mt-[116px] px-[40px]"
  >
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </template>
    </router-view>
  </n-layout-content>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
</script>
