import axios from 'axios'
import { RouteRecordNormalized } from 'vue-router'
import { LoginData, LoginRes } from './types'

export const login = (data: LoginData) =>
  axios.post<LoginRes>('/api/user/login', data)

export const logout = () => axios.post('/api/user/logout')

export const getMenuList = () =>
  axios.post<RouteRecordNormalized[]>('/api/user/menu')
