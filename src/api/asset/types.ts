export type projectReq = {
  name: string | null
  parentProjectId: string | null
}

export type projectListReq = {
  page: number | null
  pageSize: number | null
}
