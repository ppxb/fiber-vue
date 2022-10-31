import { getToken } from '@/utils/auth'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
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
    console.log(res)

    if (res.code !== 20000) {
      if (
        [50008, 50012, 50014].includes(res.code) &&
        response.config.url !== '/api/user/info'
      ) {
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)
