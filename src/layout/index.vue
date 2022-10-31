<template>
  <n-layout has-sider position="absolute">
    <Sider />
    <n-layout>
      <Header />
      <Content />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
  import Sider from './components/sider.vue'
  import Header from './components/header.vue'
  import Content from './components/content.vue'
</script>
