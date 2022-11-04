import { getToken } from '@/utils/auth'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from '@/store'
import { unref } from 'vue'

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
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
    const res = response.data

    if (res.code == 500) return Promise.reject(new Error(res.msg || 'Error'))
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)
