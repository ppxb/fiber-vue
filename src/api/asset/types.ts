export type listReq = {
  page: number | null
  pageSize: number | null
  query?: any
}

export type projectReq = {
  name: string | null
  parentProjectId: string | null
  level: number | null
}
