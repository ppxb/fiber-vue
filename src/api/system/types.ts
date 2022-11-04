export type CreateDeptReq = {
  name: string | null
  parentId: string | null
  level: number | null
  headerId: string | null
}

export type CreateUserReq = {
  mobile: string | null
  name: string | null
  email: string | null
  deptId: string | null
  roleId: string | null
  avatar: string | null
}
