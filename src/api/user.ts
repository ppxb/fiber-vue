import axios from 'axios'

export interface LoginData {
  mobile: string
  password: string
}

export interface LoginRes {
  token: string
}

export const login = (data: LoginData) =>
  axios.post<LoginRes>('/api/user/login', data)
