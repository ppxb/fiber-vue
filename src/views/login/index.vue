<template>
  <div class="container">
    <div class="logo">
      <img
        alt="logo"
        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
      />
      <div class="logo-text">Fiber</div>
    </div>
  </div>
</template>

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
  }
</style>
