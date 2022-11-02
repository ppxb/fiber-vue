<template>
  <n-layout has-sider position="absolute">
    <Sidebar />
    <n-layout>
      <Header />
      <Content />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
  import Sidebar from './components/sidebar.vue'
  import Header from './components/header.vue'
  import Content from './components/content.vue'
</script>
