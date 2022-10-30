<template>
  <div class="flex items-center w-80 ml-8 color-[#333]">
    <template v-if="!userInfo.name">
      <div class="flex flex-col">
        <div class="flex items-center text-2xl mb-3">
          <div>
            <span class="font-600">登录</span>
          </div>
        </div>
        <div class="flex">
          <input
            class="border-none px-[14px] py-[8px] font-600 text-[1.125em] bg-light-300 color-dark-200 rounded-xl transition-all outline-none focus:bg-[#eee] font-reset"
            type="phone"
            placeholder="请输入手机号"
            v-model="userLoginReq.mobile"
            v-on:input="handleMobileChange"
            maxlength="11"
          />
          <transition name="fade">
            <div
              class="px-3 py-4 bg-light-300 ml-3 transition-all"
              v-show="showLoginBtn"
              @click="handleSubmit"
            >
              <!-- <IconLoading v-if="loading" />
              <IconRight v-else /> -->
            </div>
          </transition>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col">
        <div class="flex items-center text-2xl mb-3">
          <img
            :src="userInfo.avatar"
            alt=""
            class="w-8 h-8 rounded-[10px] mr-3"
          />
          <div>
            <span class="font-700">{{ userInfo.name }}</span
            >，欢迎回来。
          </div>
        </div>
        <div class="flex">
          <input
            class="border-none px-[14px] py-[8px] font-600 text-[1.125em] bg-light-300 color-dark-200 rounded-xl transition-all outline-none focus:bg-[#eee] font-reset"
            type="password"
            placeholder="请输入密码"
            v-model="userLoginReq.password"
            v-on:input="handlePasswordChange"
          />
          <transition name="fade">
            <div
              class="px-3 py-4 bg-light-300 ml-3 transition-all"
              v-show="showLoginBtn"
              @click="handleSubmit"
            >
              <!-- <IconLoading v-if="loading" />
              <IconRight v-else /> -->
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
  import useLoading from '@/hooks/loading'
  import { useUserStore } from '@/store'
  import { useRouter } from 'vue-router'
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
        // Message.success('登录成功')
      } else {
        const userCheckedInfo = await check(userLoginReq.mobile)
        console.log(userCheckedInfo)
        userInfo.avatar = userCheckedInfo.data.data.userInfo.avatar
        userInfo.name = userCheckedInfo.data.data.userInfo.name
      }
      showLoginBtn.value = false
    } finally {
      setLoading(false)
    }
  }
</script>

<style scoped>
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    margin-right: 10px;
  }
  .font-reset {
    font-family: 'Poppins', 'SF Pro SC', sans-serif;
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
