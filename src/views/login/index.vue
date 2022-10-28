<template>
  <div class="container">
    <div class="container-content">
      <div class="container-logo">
        <div class="container-logo-slogan">
          <div class="highlight">F</div>
          <div>iber</div>
        </div>
        <div class="container-logo-text">N-Gen 智慧化办公系统</div>
      </div>
      <LoginForm />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './login-form.vue'
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: center;

    &-content {
      display: flex;
    }

    &-logo {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 4rem;
      color: #313131;

      &-text {
        font-size: 2em;
        font-weight: 700;
      }

      &-slogan {
        display: flex;
        font-size: 2em;
        font-weight: 700;
        align-items: center;
        margin-bottom: 12px;

        .highlight {
          background-color: #e7f6df;
          padding: 0px 10px;
          border-radius: 12px;
          margin-right: 4px;
        }
      }
    }
  }
</style>
