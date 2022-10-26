import axios from 'axios'
import { RouteRecordNormalized } from 'vue-router'

export interface LoginData {
  mobile: string
  password: string
}

export interface LoginRes {
  token: string
}

export const login = (data: LoginData) =>
  axios.post<LoginRes>('/api/user/login', data)

export const getMenuList = () =>
  axios.post<RouteRecordNormalized[]>('/api/user/menu')
