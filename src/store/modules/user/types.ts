export type RoleType = '' | '*' | 'admin' | 'user'

export interface UserState {
  id?: number
  name?: string
  avatar?: string
  phone?: string
  role: RoleType
}
