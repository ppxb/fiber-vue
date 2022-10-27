<template>
  <a-layout class="content">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
          <component :is="Component" :key="route.path" />
        </transition>
      </template>
    </router-view>
  </a-layout>
</template>

<style lang="less" scoped>
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }
</style>
