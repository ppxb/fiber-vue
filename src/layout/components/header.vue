<template>
  <a-layout-header>
    <section class="header-logo">
      <img
        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
      />
      <span class="header-title">Fiber</span>
    </section>

    <a-tooltip content="全屏切换" position="bottom">
      <a-button size="mini" class="gi_hover_btn" @click="toggle">
        <template #icon>
          <icon-fullscreen :size="18" v-if="!isFullscreen" />
          <icon-fullscreen-exit :size="18" v-else />
        </template>
      </a-button>
    </a-tooltip>

    <a-dropdown trigger="hover">
      <a-row align="center" class="user">
        <a-avatar :size="32">
          <img :src="userStore.userInfo.avatar" />
        </a-avatar>
        <span class="username">{{ userStore.userInfo.name }}</span>
        <icon-down />
      </a-row>
      <template #content>
        <a-divider style="margin: 0" />
        <a-doption @click="logout">
          <template #icon>
            <span
              class="doption-icon"
              style="background: rgba(var(--warning-6))"
              ><icon-export
            /></span>
          </template>
          <template #default>退出登录</template>
        </a-doption>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store'
  import { Modal } from '@arco-design/web-vue'
  import { useFullscreen } from '@vueuse/core'
  import { useRouter } from 'vue-router'

  const { isFullscreen, toggle } = useFullscreen()
  const router = useRouter()
  const userStore = useUserStore()

  const logout = () => {
    Modal.warning({
      title: '提示',
      content: '确定退出登录？',
      hideCancel: false,
      onOk: () => {
        userStore.logout()
        router.replace('/login')
      }
    })
  }
</script>

<style lang="less" scoped>
  .arco-layout-header {
    padding: 0 12px;
    height: 56px;
    background: var(--color-bg-1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-neutral-3);

    .header-logo {
      font-size: 20px;
      color: var(--color-text-1);
      display: flex;
      align-items: center;
      & img {
        width: 44px;
        height: 44px;
        border-radius: 6px;
      }
    }

    .header -title {
      font-size: 2rem;
    }
  }
</style>
