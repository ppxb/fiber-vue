<template>
  <div class="login-form-wrapper">
    <template v-if="!userInfo.name">
      <div class="password-wrapper">
        <div class="userinfo">
          <div>
            <span class="userinfo-name">登录</span>
          </div>
        </div>
        <div class="password-input-wrapper">
          <input
            type="phone"
            placeholder="请输入手机号"
            v-model="userLoginReq.mobile"
            v-on:input="handleMobileChange"
          />
          <transition name="fade">
            <div
              class="login-button"
              v-show="showLoginBtn"
              @click="handleSubmit"
            >
              <IconLoading v-if="loading" />
              <IconRight v-else />
            </div>
          </transition>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="password-wrapper">
        <div class="userinfo">
          <img :src="userInfo.avatar" alt="" class="avatar" />
          <div>
            <span class="userinfo-name">{{ userInfo.name }}</span
            >，欢迎回来。
          </div>
        </div>
        <div class="password-input-wrapper">
          <input
            type="password"
            placeholder="请输入密码"
            v-model="userLoginReq.password"
            v-on:input="handlePasswordChange"
          />
          <transition name="fade">
            <div
              class="login-button"
              v-show="showLoginBtn"
              @click="handleSubmit"
            >
              <IconLoading v-if="loading" />
              <IconRight v-else />
            </div>
          </transition>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useStorage } from '@vueuse/core'
  import { reactive, ref } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import useLoading from '@/hooks/loading'
  import { useUserStore } from '@/store'
  import { useRouter } from 'vue-router'
  import { IconRight, IconLoading } from '@arco-design/web-vue/es/icon'
  import { check } from '@/api/user'

  const router = useRouter()
  const userStore = useUserStore()
  const { loading, setLoading } = useLoading()

  const showLoginBtn = ref(false)
  const errorMessage = ref('')
  const userLoginReq = reactive({
    mobile: '',
    password: ''
  })
  const userInfo = reactive({
    avatar: '',
    name: ''
  })

  const handleMobileChange = () => {
    if (userLoginReq.mobile.length === 11) {
      showLoginBtn.value = true
    } else {
      showLoginBtn.value = false
    }
  }

  const handlePasswordChange = () => {
    if (userLoginReq.password.length) {
      showLoginBtn.value = true
    } else {
      showLoginBtn.value = false
    }
  }

  const handleSubmit = async () => {
    if (loading.value) return
    try {
      setLoading(true)
      if (userLoginReq.mobile && userLoginReq.password != '') {
        await userStore.login(userLoginReq)
        router.push('/')
        Message.success('登录成功')
      } else {
        const userCheckedInfo = await check(userLoginReq.mobile)
        userInfo.avatar = userCheckedInfo.data.userInfo.avatar
        userInfo.name = userCheckedInfo.data.userInfo.name
      }
      showLoginBtn.value = false
    } finally {
      setLoading(false)
    }
  }
</script>

<style lang="less" scoped>
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    margin-right: 10px;
  }

  .password-wrapper {
    display: flex;
    flex-direction: column;
  }

  .userinfo {
    display: flex;
    align-items: center;
    font-size: 1.5em;
    margin-bottom: 12px;
  }

  .userinfo-name {
    font-weight: 700;
  }

  .password-input-wrapper {
    display: flex;
  }
  .login-form {
    &-wrapper {
      width: 300px;
      display: flex;
      align-items: center;

      input {
        border: none;
        padding: 10px 14px;
        outline: none;
        background-color: #f8f8f8;
        color: #313131;
        font-size: 1.125em;
        font-weight: 600;
        border-radius: 12px;
        transition: all 0.25s ease-in;

        &:focus {
          background-color: #eeeeee;
        }
      }

      .login-button {
        padding: 10px 12px;
        background-color: #f8f8f8;
        border-radius: 12px;
        margin-left: 12px;
        transition: all 0.25s ease-in;

        &:hover {
          cursor: pointer;
          background-color: #eeeeee;
        }
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.25s ease-in;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
