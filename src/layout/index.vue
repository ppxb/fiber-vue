<template>
  <a-layout class="layout">
    <Sider />
    <a-layout>
      <Header />
      <Content />
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import Sider from './components/sider.vue'
  import Header from './components/header.vue'
  import Content from './components/content.vue'
</script>

<style lang="less" scoped>
  .layout {
    height: 100vh;
  }
</style>
