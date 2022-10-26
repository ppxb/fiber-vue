import { getToken } from '@/utils/auth'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message, Modal } from '@arco-design/web-vue'
import { useUserStore } from '@/store'

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
      Message.error({
        content: res.msg || 'Error',
        duration: 3 * 1000
      })

      if (
        [50008, 50012, 50014].includes(res.code) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: 'Confirm Logout',
          content:
            'You have been logged out, you can cancel to stay on this page, or log in again',
          okText: 'Re Login',
          async onOk() {
            // const userStore = useUserStore()
            // await userStore.logout()
            window.location.reload()
          }
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
