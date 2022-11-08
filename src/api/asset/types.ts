export type listReq = {
  page: number | null
  pageSize: number | null
}

export type projectReq = {
  name: string | null
  parentProjectId: string | null
}
