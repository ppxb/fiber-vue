<template>
  <div class="flex flex-col h-screen items-center justify-center">
    <div class="flex">
      <div class="flex flex-col items-end mr-8 color-[#333]">
        <div class="flex text-3xl font-700 items-center mb-3">
          <div class="bg-[#e7f6df] px-[10px] rounded-[12px] mr-[4px]">F</div>
          <div>iber</div>
        </div>
        <div class="font-700 text-3xl">N-Gen 模块化智慧办公系统</div>
      </div>
      <LoginForm />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './login-form.vue'
</script>
