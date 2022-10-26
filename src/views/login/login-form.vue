<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">登录Fiber</div>
    <div class="login-form-sub-title">可以使用Fiber SSO 实现全站统一登录</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="mobile"
        :rules="[{ required: true, message: '手机号码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.mobile" placeholder="请输入手机号码" />
      </a-form-item>
      <a-form-item
        filed="password"
        :rule="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          placeholder="请输入密码"
          allow-clear
        />
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword"
          >
            记住密码
          </a-checkbox>
          <a-link>忘记密码</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          登录
        </a-button>
        <a-button type="text" long class="login-form-register-btn">
          注册账号
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { useStorage } from '@vueuse/core'
  import { reactive, ref } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface'
  import useLoading from '@/hooks/loading'
  import { useUserStore } from '@/store'
  import { LoginData } from '@/api/user'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const userStore = useUserStore()
  const { loading, setLoading } = useLoading()

  const errorMessage = ref('')
  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    mobile: '',
    password: ''
  })

  const userInfo = reactive({
    mobile: loginConfig.value.mobile,
    password: loginConfig.value.password
  })

  const handleSubmit = async ({
    errors,
    values
  }: {
    errors: Record<string, ValidatedError> | undefined
    values: Record<string, any>
  }) => {
    if (loading.value) return
    if (!errors) {
      setLoading(true)
      try {
        await userStore.login(values as LoginData)
        const { redirect, ...othersQuery } = router.currentRoute.value.query
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery
          }
        })
        Message.success('登录成功')
        const { rememberPassword } = loginConfig.value
        const { mobile, password } = values
        loginConfig.value.mobile = mobile
        loginConfig.value.password = password
        loginConfig.value.rememberPassword = rememberPassword
      } catch (err) {
        errorMessage.value = (err as Error).message
      } finally {
        setLoading(false)
      }
    }
  }

  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value
  }
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 700;
      font-size: 32px;
      margin-bottom: 4px;
    }

    &-sub-title {
      color: var(--color-text-3);
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
