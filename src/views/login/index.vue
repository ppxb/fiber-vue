<template>
  <div class="container">
    <div class="logo">
      <img
        alt="logo"
        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
      />
      <div class="logo-text">Fiber</div>
    </div>
    <div class="content">
      <LoginForm />
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './login-form.vue'
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .logo {
      position: fixed;
      top: 24px;
      left: 24px;
      z-index: 1;
      display: inline-flex;
      align-items: center;

      &-text {
        margin: 0 4px;
        color: var(--color-fill-1);
        font-size: 20px;
      }
    }

    .content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>
