import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from '@/store'
import { createDiscreteApi, useMessage } from 'naive-ui'

axios.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const { token } = userStore
    if (token) {
      if (!config.headers) config.headers = {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const { message } = createDiscreteApi(['message'], {
      messageProviderProps: {
        placement: 'top'
      }
    })
    const res = response.data

    if (res.code === 10001) {
      message.success(res.msg)
    } else {
      message.error(res.msg)
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)
