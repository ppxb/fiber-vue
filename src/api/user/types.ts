export interface UserInfo {
  id: number
  name: string
  avatar: string
  phone: string
  role: string
}

export interface LoginData {
  mobile: string
  password: string
}

export interface LoginRes {
  token: string
  userInfo: UserInfo
}
