import axios from 'axios'

export const list = (data: any) => axios.post('/api/asset/list', data)

// add asset bind project
export const createProject = (data: any) =>
  axios.post('/api/asset/project/create', data)
